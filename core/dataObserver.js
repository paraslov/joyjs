import { track, trigger } from './tracker.js'

let effect = null
export const watcher = (callback) => {
  effect = callback
  effect()
  effect = null
}

export function observe(data) {
  return new Proxy(data, {
    get(target, key) {
      if (effect) {
        track(target, key, effect)
      }

      return target[key]
    },
    set(target, key, value) {
      target[key] = value

      trigger(target, key)
    }
  })
}
