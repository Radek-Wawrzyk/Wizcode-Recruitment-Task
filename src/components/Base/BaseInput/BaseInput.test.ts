import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseInput from './BaseInput.vue';
import { ICON } from '@/icons';

describe('BaseInput', () => {
  const createWrapper = (props = {}) => {
    return mount(BaseInput, {
      props: {
        modelValue: '',
        ...props,
      },
      global: {
        stubs: {
          BaseIcon: {
            template: '<div class="base-icon-stub" :data-name="name" :data-size="size"></div>',
            props: ['name', 'size'],
          },
        },
      },
    });
  };

  it('Renders the component with default properties', () => {
    const wrapper = createWrapper();

    expect(wrapper.find('.base-input').exists()).toBe(true);
    expect(wrapper.find('input').exists()).toBe(true);
    expect(wrapper.find('input').attributes('type')).toBe('text');
    expect(wrapper.find('input').attributes('disabled')).toBeUndefined();
    expect(wrapper.find('label').exists()).toBe(false);
    expect(wrapper.find('.base-input__error').exists()).toBe(false);
  });

  it('passes the correct value to the input field', () => {
    const value = 'test value';
    const wrapper = createWrapper({ modelValue: value });

    expect(wrapper.find('input').element.value).toBe(value);
  });

  it('emits the update:modelValue event when the value is changed', async () => {
    const wrapper = createWrapper();
    const input = wrapper.find('input');

    await input.setValue('new value');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['new value']);
  });

  it('renders the label when the "label" prop is passed', () => {
    const label = 'Test Label';
    const wrapper = createWrapper({ label });

    expect(wrapper.find('label').exists()).toBe(true);
    expect(wrapper.find('label').text()).toBe(label);
  });

  it('renders the placeholder when the "placeholder" prop is passed', () => {
    const placeholder = 'Test placeholder';
    const wrapper = createWrapper({ placeholder });

    expect(wrapper.find('input').attributes('placeholder')).toBe(placeholder);
  });

  it('renders the icon when the "icon" prop is passed', () => {
    const wrapper = createWrapper({ icon: ICON.SEARCH });

    expect(wrapper.find('.base-input').classes()).toContain('base-input--with-icon');
    expect(wrapper.find('.base-input__icon').exists()).toBe(true);

    const icon = wrapper.find('.base-icon-stub');
    expect(icon.exists()).toBe(true);
    expect(icon.attributes('data-name')).toBe(ICON.SEARCH);
  });

  it('sets the component as disabled when the "disabled" prop is passed', () => {
    const wrapper = createWrapper({ disabled: true });

    expect(wrapper.find('.base-input').classes()).toContain('base-input--disabled');
    expect(wrapper.find('input').attributes('disabled')).toBe('');
  });

  it('renders the error message when the "error" prop is passed', () => {
    const error = 'This field is required';
    const wrapper = createWrapper({ error });

    expect(wrapper.find('.base-input').classes()).toContain('base-input--error');
    expect(wrapper.find('.base-input__error').exists()).toBe(true);
    expect(wrapper.find('.base-input__error').text()).toBe(error);
  });

  it('generates a unique id for the input field when the "id" prop is not passed', () => {
    const wrapper = createWrapper();
    const inputId = wrapper.find('input').attributes('id');

    expect(inputId).toBeDefined();
    expect(inputId).toMatch(/^input-/);
  });

  it('uses the passed id for the input field when the "id" prop is passed', () => {
    const id = 'custom-input-id';
    const wrapper = createWrapper({ id });

    expect(wrapper.find('input').attributes('id')).toBe(id);
  });

  it('correctly connects the input field id with the label through the "for" attribute', () => {
    const wrapper = createWrapper({ label: 'Test Label' });
    const inputId = wrapper.find('input').attributes('id');

    expect(wrapper.find('label').attributes('for')).toBe(inputId);
  });

  it('changes the input field type according to the passed "type" prop', () => {
    const typeTests = [
      { type: 'text', expected: 'text' },
      { type: 'password', expected: 'password' },
      { type: 'email', expected: 'email' },
      { type: 'number', expected: 'number' },
    ];

    typeTests.forEach((test) => {
      const wrapper = createWrapper({ type: test.type });
      expect(wrapper.find('input').attributes('type')).toBe(test.expected);
    });
  });
});
