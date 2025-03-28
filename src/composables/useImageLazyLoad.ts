import { ref, onMounted, onUnmounted } from 'vue';

export function useImageLazyLoad() {
  const imageRef = ref<HTMLImageElement | null>(null);
  const isLoaded = ref(false);
  const isError = ref(false);
  const isIntersecting = ref(false);

  let observer: IntersectionObserver | null = null;

  const onLoaded = () => {
    isLoaded.value = true;
  };

  const onError = () => {
    isError.value = true;
  };

  onMounted(() => {
    if (!imageRef.value) return;

    const targetImage = imageRef.value;
    const imageUrl = targetImage.getAttribute('data-src');

    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isIntersecting.value = entry.isIntersecting;

        if (entry.isIntersecting) {
          if (imageUrl) {
            targetImage.src = imageUrl;
          }

          if (observer) {
            observer.disconnect();
            observer = null;
          }
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      },
    );

    observer.observe(targetImage);

    targetImage.addEventListener('load', onLoaded);
    targetImage.addEventListener('error', onError);
  });

  onUnmounted(() => {
    // Czyszczenie
    if (observer) {
      observer.disconnect();
    }

    if (imageRef.value) {
      imageRef.value.removeEventListener('load', onLoaded);
      imageRef.value.removeEventListener('error', onError);
    }
  });

  return {
    imageRef,
    isLoaded,
    isError,
    isIntersecting,
  };
}
