// Suppress Node.js warning about experimental fetch API
// Ref: https://github.com/nodejs/node/issues/30810#issuecomment-1383184769
// Ref: https://github.com/nodejs/node/issues/30810

// eslint-disable-next-line no-undef
const originalEmit = process.emit;
const warningMessageToIgnore = [
  'Custom ESM Loaders is an experimental feature and might change at any time',
  'Watch mode is an experimental feature and might change at any time',
  'Implicit coercion to integer for exit code is deprecated.'
];
// eslint-disable-next-line no-undef
process.emit = function (event, error) {
  if (
    event === 'warning' &&
    ['ExperimentalWarning', 'DeprecationWarning'].includes(error.name) &&
    warningMessageToIgnore.includes(error.message)
  ) {
    return false;
  }

  // eslint-disable-next-line no-undef
  return originalEmit.apply(process, arguments);
};
