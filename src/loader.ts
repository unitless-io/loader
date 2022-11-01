import path from 'path';
import type { JSONSchema7 } from 'schema-utils/declarations/validate';
import type * as webpack from 'webpack';

import { inject, MAGIC_COMMENTS_REGEXP } from '@unitless-io/inject-interceptor';

interface LoaderOptions {
  enabled?: boolean;
}

const schema: JSONSchema7 = {
  title: '@unitless-io loader options',
  type: 'object',
  properties: {
    enabled: {
      description: 'Inject or not interceptor (default: true)',
      type: 'boolean',
      default: true,
    },
  },
};

export default async function unitlessLoader(
  this: webpack.LoaderContext<LoaderOptions>,
  content: string,
  ...otherArgss: any[]
) {
  this.cacheable && this.cacheable();
  const callback = this.async();

  const { enabled = true } = this.getOptions(schema);

  if (!enabled || !MAGIC_COMMENTS_REGEXP.TEST.test(content) || this.mode !== 'development') {
    callback(null, content, ...otherArgss);
    return;
  }

  const filePath = path.relative(this.rootContext, this.resourcePath).split(path.sep).join('/');

  const newContent = inject(content, filePath);

  callback(null, newContent, ...otherArgss);

  return;
}
