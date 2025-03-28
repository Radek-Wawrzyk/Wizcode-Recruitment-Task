import { ref } from 'vue';
import { describe, it, expect } from 'vitest';
import { useElementOverflow } from '../useElementOverflow';

function createElement(
  clientWidth: number,
  scrollWidth: number,
  clientHeight: number,
  scrollHeight: number,
): HTMLElement {
  const el = document.createElement('div');
  Object.defineProperty(el, 'clientWidth', { configurable: true, value: clientWidth });
  Object.defineProperty(el, 'scrollWidth', { configurable: true, value: scrollWidth });
  Object.defineProperty(el, 'clientHeight', { configurable: true, value: clientHeight });
  Object.defineProperty(el, 'scrollHeight', { configurable: true, value: scrollHeight });
  return el;
}

describe('useElementOverflow composable', () => {
  it('should not detect overflow when element is undefined', () => {
    const elementRef = ref<HTMLElement | undefined>(undefined);
    const { isXOverflowing, isYOverflowing, onResize } = useElementOverflow(elementRef, false);
    onResize();
    expect(isXOverflowing.value).toBe(false);
    expect(isYOverflowing.value).toBe(false);
  });

  it('should not detect overflow when dimensions are equal', () => {
    const el = createElement(100, 100, 200, 200);
    const elementRef = ref(el);
    const { isXOverflowing, isYOverflowing, onResize } = useElementOverflow(elementRef, false);
    onResize();
    expect(isXOverflowing.value).toBe(false);
    expect(isYOverflowing.value).toBe(false);
  });

  it('should detect horizontal overflow when clientWidth < scrollWidth', () => {
    const el = createElement(100, 150, 200, 200);
    const elementRef = ref(el);
    const { isXOverflowing, onResize } = useElementOverflow(elementRef, false);
    onResize();
    expect(isXOverflowing.value).toBe(true);
  });

  it('should detect vertical overflow when clientHeight < scrollHeight', () => {
    const el = createElement(100, 100, 200, 250);
    const elementRef = ref(el);
    const { isYOverflowing, onResize } = useElementOverflow(elementRef, false);
    onResize();
    expect(isYOverflowing.value).toBe(true);
  });

  it('should detect both horizontal and vertical overflows', () => {
    const el = createElement(100, 150, 200, 250);
    const elementRef = ref(el);
    const { isXOverflowing, isYOverflowing, onResize } = useElementOverflow(elementRef, false);
    onResize();
    expect(isXOverflowing.value).toBe(true);
    expect(isYOverflowing.value).toBe(true);
  });
});
