import { create } from 'zustand';

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (value: number) => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  setCount: (value) => set({ count: value }),
}));

// Actions
export const useIncrement = () => useCounterStore((state) => state.increment);
export const useDecrement = () => useCounterStore((state) => state.decrement);
export const useReset = () => useCounterStore((state) => state.reset);
export const useSetCount = () => useCounterStore((state) => state.setCount);

// Selectors
export const useCount = () => useCounterStore((state) => state.count);
