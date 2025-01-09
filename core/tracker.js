const targetMap = new WeakMap()

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
    dep.forEach(effect => effect())
  }
}
