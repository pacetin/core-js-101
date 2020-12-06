module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "linebreak-style": ["error", (require("os").EOL === "\r\n" ? "windows" : "unix")],
    "allowForLoopAfterthoughts": 0,
    "no-use-before-define": ["error", { "functions": false, "classes": true, "variables": true }]
  },
};
