import { watcher } from './watcher.js';

const computed = (callback) => {
  let value;
  let isDirty = true;
  const effect = () => {
    callback();
    isDirty = true;
  };

  watcher(effect);

  return {
    get value() {
      if (isDirty) {
        value = callback();
        isDirty = false;
      }
      return value;
    },
  };
};
