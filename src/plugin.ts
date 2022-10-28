import type * as webpack from 'webpack';

import { startDataServer } from '@unitless-io/data-server';

import { PORT } from './config';

export class UnitlessPlugin {
  apply(compiler: webpack.Compiler) {
    if (compiler.options.mode === 'development') {
      // Use the Webpack 4+ Hooks API when possible.
      if (compiler.hooks) {
        const plugin = { name: 'UnitlessPlugin' };

        compiler.hooks.afterEmit.tapAsync(plugin, this.startServer);
      } else {
        // @ts-expect-error
        compiler.plugin('after-emit', this.startServer);
      }
    }
  }

  isStarted: boolean = false;

  startServer = (_compilation: webpack.Compilation, callback: Function) => {
    if (!this.isStarted) {
      startDataServer(PORT);

      this.isStarted = true;
    }

    callback();
  };
}
