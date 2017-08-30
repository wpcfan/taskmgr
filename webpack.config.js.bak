// Angular CLI Universal Build 当前有一些问题，所以采用 webpack 对已编译的文件再做一次 webpack

const input = `./dist-server/main.bundle`;
const output = `./dist-server/main.repack.bundle.js`;
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  entry: input,
  externals: [webpackNodeExternals({ whitelist: [
    /angular-draggable-droppable/,
    /angular-calendar/,
    /angular-resizable-element/
  ] })],
  output: { filename: output, libraryTarget: 'commonjs' },
}
