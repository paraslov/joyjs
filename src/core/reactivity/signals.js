let currentEffect = null;
let batchUpdateQueue = new Set();
let isBatching = false;

export const createSignal = (initialState) => {
  let _value = initialState;
  const _signal = {};
  const _subscribers = new Set();

  _signal.get = function () {
    if (currentEffect) {
      _subscribers.add(currentEffect);
    }

    return _value;
  };

  _signal.set = function (reducer) {
    const newState = reducer(_value);

    _value = newState;
    _subscribers.forEach((effect) => {
      if (effect !== currentEffect) {
        batchUpdateQueue.add(effect);
      }
    });

    if (!isBatching) {
      isBatching = true;
      Promise.resolve().then(() => {
        batchUpdateQueue.forEach((e) => e());
        batchUpdateQueue.clear();
        isBatching = false;
      });
    }

    return _value;
  };

  return _signal;
};

export const createSignalEffect = (cb) => {
  currentEffect = cb;
  cb();
  currentEffect = null;
};

export const computed = (cb) => {
  const _signal = {};
  _signal.get = () => {
    return cb();
  };

  return _signal;
};

let valueTest = 0;
const newSignal = createSignal(5);
const newSignal2 = createSignal(7);
const multiplier = createSignal(2);

createSignalEffect(() => {
  newSignal.set((v) => v + 8);

  valueTest = newSignal.get();
});
console.log('@> valueTest: ', valueTest);

createSignalEffect(() => {
  newSignal.set((v) => v + newSignal2.get());

  valueTest = newSignal.get();
});
console.log('@> valueTest: ', valueTest);

const doubleValue = computed(() => newSignal.get() * multiplier.get());
console.log('@> doubleSignal1: ', doubleValue.get());

newSignal.set((v) => v / 10);
console.log('@> newSignal: ', newSignal.get());

console.log('@> doubleSignal2: ', doubleValue.get());

createSignalEffect(() => {
  newSignal2.set((v) => v + newSignal2.get());

  valueTest = newSignal2.get();
});
console.log('@> valueTestLast: ', valueTest);
