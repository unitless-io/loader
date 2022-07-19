const queue = new Set<string>();

const main = () => {
  if (queue.size > 0) {
    const values = Array.from(queue);
    queue.clear();

    fetch('https://catcher.unitless.io/v1/function-data', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        values.map((valueStr) => {
          const value = JSON.parse(valueStr);
          return { ...value, args: JSON.stringify(value.args), result: JSON.stringify(value.result) };
        })
      ),
    });
  }
  return;
};

const pushToQueue = (args: ArrayLike<any>, result: any, id: string) => {
  queue.add(JSON.stringify({ args, result, id }));

  if (queue.size > 10) main();
};

setInterval(main, 10000);

export const _$Proxy = (f: any, id: string) =>
  new Proxy(f, {
    apply(_target: Function, _thisArg: any, args: ArrayLike<any>) {
      const result = Reflect.apply(_target, _thisArg, args);

      pushToQueue(args, result, id);

      return result;
    },
  });
