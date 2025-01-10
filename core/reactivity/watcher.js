export let activeEffect = null
export const watcher = (callback) => {
    activeEffect = callback
    activeEffect()
    activeEffect = null
}
