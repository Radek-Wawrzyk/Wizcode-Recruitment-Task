import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { ICON } from '@/icons';

import BaseButton from './BaseButton.vue';

describe('BaseButton', () => {
  const createWrapper = (props = {}, slots = {}) => {
    return mount(BaseButton, {
      props,
      slots,
      global: {
        stubs: {
          RouterLink: {
            template: '<a :to="to" class="router-link-stub"><slot /></a>',
            props: ['to'],
          },
          BaseIcon: {
            template: '<div class="base-icon-stub" :data-name="name"></div>',
            props: ['name'],
          },
        },
      },
    });
  };

  it('Renders a button with default properties', () => {
    const wrapper = createWrapper();

    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.classes()).toContain('base-button');
    expect(wrapper.classes()).toContain('base-button--primary');
    expect(wrapper.classes()).toContain('base-button--medium');
    expect(wrapper.attributes('disabled')).toBeUndefined();
  });

  it('renders as a RouterLink when the "to" prop is passed', () => {
    const to = '/test-route';
    const wrapper = createWrapper({ to });

    expect(wrapper.find('.router-link-stub').exists()).toBe(true);
    expect(wrapper.attributes('to')).toBe(to);
  });

  it('renders as a disabled button when the "disabled" prop is passed', () => {
    const wrapper = createWrapper({ disabled: true });

    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.classes()).toContain('base-button--disabled');
    expect(wrapper.attributes('disabled')).toBe('');
  });

  it('applies correct classes depending on the "type" prop', () => {
    const primaryWrapper = createWrapper({ type: 'primary' });
    expect(primaryWrapper.classes()).toContain('base-button--primary');

    const secondaryWrapper = createWrapper({ type: 'secondary' });
    expect(secondaryWrapper.classes()).toContain('base-button--secondary');

    const tertiaryWrapper = createWrapper({ type: 'tertiary' });
    expect(tertiaryWrapper.classes()).toContain('base-button--tertiary');
  });

  it('applies correct classes depending on the "size" prop', () => {
    const smallWrapper = createWrapper({ size: 'small' });
    expect(smallWrapper.classes()).toContain('base-button--small');

    const mediumWrapper = createWrapper({ size: 'medium' });
    expect(mediumWrapper.classes()).toContain('base-button--medium');

    const largeWrapper = createWrapper({ size: 'large' });
    expect(largeWrapper.classes()).toContain('base-button--large');
  });

  it('renders the left icon when the "leftIcon" prop is passed', () => {
    const wrapper = createWrapper({ leftIcon: ICON.HEART });

    expect(wrapper.classes()).toContain('base-button--with-left-icon');

    const leftIcon = wrapper.find('.base-button__icon--left .base-icon-stub');
    expect(leftIcon.exists()).toBe(true);
    expect(leftIcon.attributes('data-name')).toBe(ICON.HEART);
  });

  it('renders the right icon when the "rightIcon" prop is passed', () => {
    const wrapper = createWrapper({ rightIcon: 'chevron-down' });

    expect(wrapper.classes()).toContain('base-button--with-right-icon');

    const rightIcon = wrapper.find('.base-button__icon--right .base-icon-stub');
    expect(rightIcon.exists()).toBe(true);
    expect(rightIcon.attributes('data-name')).toBe('chevron-down');
  });

  it('renders the content of the slot', () => {
    const buttonText = 'Test button';
    const wrapper = createWrapper({}, { default: buttonText });

    expect(wrapper.find('.base-button__content').text()).toBe(buttonText);
  });

  it('renders buttons with different combinations of properties', () => {
    const wrapper = createWrapper(
      {
        type: 'secondary',
        size: 'large',
        leftIcon: 'home',
        rightIcon: 'chevron-down',
        disabled: true,
      },
      { default: 'Complex button' },
    );

    expect(wrapper.classes()).toContain('base-button--secondary');
    expect(wrapper.classes()).toContain('base-button--large');
    expect(wrapper.classes()).toContain('base-button--with-left-icon');
    expect(wrapper.classes()).toContain('base-button--with-right-icon');
    expect(wrapper.classes()).toContain('base-button--disabled');
    expect(wrapper.attributes('disabled')).toBe('');
    expect(wrapper.find('.base-button__content').text()).toBe('Complex button');

    const leftIcon = wrapper.find('.base-button__icon--left .base-icon-stub');
    expect(leftIcon.exists()).toBe(true);
    expect(leftIcon.attributes('data-name')).toBe('home');

    const rightIcon = wrapper.find('.base-button__icon--right .base-icon-stub');
    expect(rightIcon.exists()).toBe(true);
    expect(rightIcon.attributes('data-name')).toBe('chevron-down');
  });
});
