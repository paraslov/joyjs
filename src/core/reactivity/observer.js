import { activeEffect } from './watcher.js';
import { track, trigger } from './tracker.js';

function observe(data) {
  return new Proxy(data, {
    get(target, key) {
      if (activeEffect) {
        track(target, key, activeEffect);
      }

      return target[key];
    },
    set(target, key, value) {
      target[key] = value;

      trigger(target, key);
    },
  });
}
