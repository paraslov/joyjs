import { activeEffect } from './watcher.js'

const targetMap = new WeakMap()
const effectQueue = new Set()
let isFlushing = false

export function track(target, key, effect) {
  let depsMap = targetMap.get(target)
  if (!depsMap) targetMap.set(target, (depsMap = new Map()))

  let dep = depsMap.get(key)
  if (!dep) depsMap.set(key, (dep = new Set()))

  dep.add(effect)
}

export function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return

  let dep = depsMap.get(key)
  if (dep) {
    dep.forEach((effect) => {
      if (effect !== activeEffect) {
        effectQueue.add(effect)
      }
    })

    if (!isFlushing) {
      isFlushing = true
      Promise.resolve().then(() => {
        effectQueue.forEach((effect) => effect())
        effectQueue.clear()
        isFlushing = false
      })
    }
  }
}
