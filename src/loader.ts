import { Blob } from 'buffer';
import path from 'path';
import fetch from 'node-fetch';
import type { JSONSchema7 } from 'schema-utils/declarations/validate';
import type * as webpack from 'webpack';

import { inject } from '@unitless-io/inject-interceptor';

interface LoaderOptions {
  token: string;
  enabled?: boolean;
}

const COMMENT_REGEXP = /@test-next-line/;
const MAX_CONTENT_SIZE = 2 * 1048576; // 2MB

const schema: JSONSchema7 = {
  title: 'Data catcher loader options',
  type: 'object',
  properties: {
    token: {
      description: 'Access token',
      type: 'string',
    },
    enabled: {
      description: 'Inject or not interceptor (default: true)',
      type: 'boolean',
      default: true,
    },
  },
  required: ['token'],
};

enum ResBodyStatus {
  Injected,
  NotModified,
}
interface ResBody {
  status: ResBodyStatus;
  content?: string;
}

export default async function loader(
  this: webpack.LoaderContext<LoaderOptions>,
  content: string,
  ...otherArgss: any[]
) {
  this.cacheable && this.cacheable();
  const callback = this.async();

  const { token, enabled = true } = this.getOptions(schema);

  if (!enabled || !COMMENT_REGEXP.test(content)) {
    callback(null, content, ...otherArgss);
    return;
  }

  const filePath = path.relative(this.rootContext, this.resourcePath).split(path.sep).join('/');

  if (!token) {
    const newContent = inject(content, filePath, this.rootContext);

    callback(null, newContent, ...otherArgss);

    return;
  }

  const blob = new Blob([content]);

  if (blob.size > MAX_CONTENT_SIZE) {
    console.error(`The resource "${this.resourcePath}" is larger than ${MAX_CONTENT_SIZE}`);
    callback(null, content, ...otherArgss);
    return;
  }

  const response = await fetch('https://inject.unitless.io/v1/inject', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: token,
      content,
      path: filePath,
      mode: 'webpack',
      webpackData: {
        mode: this.mode,
        // @ts-ignore
        target: this.target,
      },
    }),
  });

  const data = (await response.json()) as ResBody;

  if (data.status === ResBodyStatus.NotModified) {
    callback(null, content, ...otherArgss);

    return;
  }

  callback(null, data.content, ...otherArgss);

  return;
}
