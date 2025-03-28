import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { defineComponent, nextTick } from 'vue';
import { useImageLazyLoad } from '../useImageLazyLoad';

let originalIntersectionObserver: typeof IntersectionObserver;

let mockObserverInstance: { callback: IntersectionObserverCallback } & {
  // @ts-ignore
  observe: vi.Mock;
  // @ts-ignore
  disconnect: vi.Mock;
};

class IntersectionObserverMock {
  callback: IntersectionObserverCallback;
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;

    mockObserverInstance = {
      callback,
      observe: vi.fn(),
      disconnect: vi.fn(),
    };
  }
  observe(target: Element) {
    mockObserverInstance.observe(target);
  }
  disconnect() {
    mockObserverInstance.disconnect();
  }
}

beforeEach(() => {
  // INFO: Override IntersectionObserver with our mock
  originalIntersectionObserver = window.IntersectionObserver;
  window.IntersectionObserver = IntersectionObserverMock as any;
});

afterEach(() => {
  // INFO: Restore the original IntersectionObserver and all mocks
  window.IntersectionObserver = originalIntersectionObserver;
  vi.restoreAllMocks();
});

const TestComponent = defineComponent({
  setup() {
    return useImageLazyLoad();
  },
  template: `<img ref="imageRef" data-src="http://example.com/image.jpg" />`,
});

describe('useImageLazyLoad composable', () => {
  it('should load the image when intersection occurs', async () => {
    const wrapper = mount(TestComponent);
    await flushPromises();

    const imgEl = wrapper.find('img').element as HTMLImageElement;

    const entry = {
      isIntersecting: true,
      target: imgEl,
      intersectionRatio: 0.2,
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: null,
      time: Date.now(),
    };

    mockObserverInstance.callback([entry], {
      root: null,
      rootMargin: '',
      thresholds: [],
      takeRecords: () => [],
      observe: mockObserverInstance.observe,
      unobserve: vi.fn(),
      disconnect: mockObserverInstance.disconnect,
    } as unknown as IntersectionObserver);
    await nextTick();

    expect(imgEl.src).toBe('http://example.com/image.jpg');
    expect(wrapper.vm.isIntersecting).toBe(true);
    expect(mockObserverInstance.disconnect).toHaveBeenCalled();
  });

  it('should set isLoaded when the image load event fires', async () => {
    const wrapper = mount(TestComponent);
    await flushPromises();

    const imgEl = wrapper.find('img').element as HTMLImageElement;
    imgEl.dispatchEvent(new Event('load'));
    await nextTick();
    expect(wrapper.vm.isLoaded).toBe(true);
  });

  it('should set isError when the image error event fires', async () => {
    const wrapper = mount(TestComponent);
    await flushPromises();

    const imgEl = wrapper.find('img').element as HTMLImageElement;
    imgEl.dispatchEvent(new Event('error'));
    await nextTick();
    expect(wrapper.vm.isError).toBe(true);
  });

  it('should clean up event listeners and observer on unmount', async () => {
    const wrapper = mount(TestComponent);
    await flushPromises();

    const imgEl = wrapper.find('img').element as HTMLImageElement;
    const removeEventListenerSpy = vi.spyOn(imgEl, 'removeEventListener');

    wrapper.unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('load', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('error', expect.any(Function));
    expect(mockObserverInstance.disconnect).toHaveBeenCalled();
  });
});
