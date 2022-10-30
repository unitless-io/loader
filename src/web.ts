import serialize from 'serialize-javascript';

import { PORT } from './config';

const queue = new Set<string>();

const deserialize = (serializedJavascript: string) => {
  return eval('(' + serializedJavascript + ')');
};

const main = () => {
  if (queue.size > 0) {
    const values = Array.from(queue);
    queue.clear();

    const url = `http://localhost:${PORT}/api/v1/calls`;

    fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        values.map((valueStr) => {
          const value = deserialize(valueStr);
          return { ...value, args: serialize(value.args), result: serialize(value.result) };
        })
      ),
    });
  }
  return;
};

const pushToQueue = (args: ArrayLike<any>, result: any, id: string) => {
  queue.add(serialize({ args, result, id }));

  if (queue.size > 10) main();
};

setInterval(main, 10000);

export const _$LocalProxy = <T extends Function>(f: T, id: string): T =>
  new Proxy(f, {
    apply(_target: T, _thisArg: any, args: ArrayLike<any>) {
      const result = Reflect.apply(_target, _thisArg, args);

      pushToQueue(args, result, id);

      return result;
    },
  });
