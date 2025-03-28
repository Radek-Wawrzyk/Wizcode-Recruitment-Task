import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseIcon from './BaseIcon.vue';
import { ICON } from '@/icons';

vi.mock('@/icons', () => ({
  ICON: {
    HEART: 'heart',
    SEARCH: 'search',
    CLOSE: 'close',
  },
  iconsCollection: {
    heart: '<svg>heart-icon</svg>',
    search: '<svg>search-icon</svg>',
    close: '<svg>close-icon</svg>',
  },
}));

describe('BaseIcon', () => {
  let wrapper;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createWrapper = (props = {}) => {
    return mount(BaseIcon, {
      props: {
        name: ICON.HEART,
        ...props,
      },
    });
  };

  it('renders the icon component with default properties', () => {
    wrapper = createWrapper();

    expect(wrapper.find('.base-icon').exists()).toBe(true);
    expect(wrapper.html()).toContain('<svg>heart-icon</svg>');

    const styles = wrapper.find('.base-icon').attributes('style');
    expect(styles).toContain('width: 24px');
    expect(styles).toContain('height: 24px');
    expect(styles).toContain('color: currentColor');
    expect(styles).toContain('fill: currentColor');
  });

  it('renders the correct icon based on the name property', () => {
    wrapper = createWrapper({ name: ICON.SEARCH });
    expect(wrapper.html()).toContain('<svg>search-icon</svg>');

    wrapper = createWrapper({ name: ICON.CLOSE });
    expect(wrapper.html()).toContain('<svg>close-icon</svg>');
  });

  it('applies the correct size in pixels when a number is passed', () => {
    wrapper = createWrapper({ size: 16 });

    const styles = wrapper.find('.base-icon').attributes('style');
    expect(styles).toContain('width: 16px');
    expect(styles).toContain('height: 16px');
  });

  it('applies the correct size with a unit when a string is passed', () => {
    wrapper = createWrapper({ size: '2rem' });

    const styles = wrapper.find('.base-icon').attributes('style');
    expect(styles).toContain('width: 2rem');
    expect(styles).toContain('height: 2rem');
  });

  it('does not add size styles when size is not passed or is null/undefined', () => {
    wrapper = createWrapper({ size: null });

    const styles = wrapper.find('.base-icon').attributes('style');
    expect(styles).not.toContain('width');
    expect(styles).not.toContain('height');
  });

  it('applies the correct color when the color property is passed', () => {
    wrapper = createWrapper({ color: 'red' });

    const styles = wrapper.find('.base-icon').attributes('style');
    expect(styles).toContain('color: red');
    expect(styles).toContain('fill: red');

    wrapper = createWrapper({ color: 'var(--color-primary)' });
    const styles3 = wrapper.find('.base-icon').attributes('style');
    expect(styles3).toContain('color: var(--color-primary)');
    expect(styles3).toContain('fill: var(--color-primary)');
  });

  it('does not add color styles when color is not passed or is null/undefined', () => {
    wrapper = createWrapper({ color: null });

    const styles = wrapper.find('.base-icon').attributes('style');
    expect(styles).not.toContain('color');
    expect(styles).not.toContain('fill');
  });

  it('combines size and color styles correctly', () => {
    wrapper = createWrapper({ size: 32, color: 'blue' });

    const styles = wrapper.find('.base-icon').attributes('style');
    expect(styles).toContain('width: 32px');
    expect(styles).toContain('height: 32px');
    expect(styles).toContain('color: blue');
    expect(styles).toContain('fill: blue');
  });
});
