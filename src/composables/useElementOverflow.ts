import type { Ref } from 'vue';
import { onBeforeUnmount, ref, watch } from 'vue';

export const useElementOverflow = (element: Ref<HTMLElement | undefined>, canResize = false) => {
  const isXOverflowing = ref(false);
  const isYOverflowing = ref(false);

  const onResize = () => {
    isXOverflowing.value = Boolean(
      element.value && element.value.clientWidth < element.value.scrollWidth,
    );
    isYOverflowing.value = Boolean(
      element.value && element.value.clientHeight < element.value.scrollHeight,
    );
  };

  const observer = canResize ? new ResizeObserver(onResize) : null;

  const setObserver = (newElement?: HTMLElement, oldElement?: HTMLElement) => {
    if (observer) {
      if (oldElement) {
        observer.unobserve(oldElement);
      }

      if (newElement) {
        observer.observe(newElement);
      }
    }
    onResize();
  };

  onBeforeUnmount(() => observer?.disconnect());

  watch(element, setObserver, { immediate: true });

  return { isXOverflowing, isYOverflowing, onResize };
};
