import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';

import BaseMultiSelect from './BaseMultiSelect.vue';

describe('BaseMultiSelect', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const createWrapper = (props = {}) => {
    return mount(BaseMultiSelect, {
      props: {
        modelValue: [],
        options,
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
      attachTo: document.body,
    });
  };

  const clickOutside = () => {
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    document.body.dispatchEvent(event);
  };

  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('renders the component with default properties', () => {
    const wrapper = createWrapper();

    expect(wrapper.find('.base-multi-select').exists()).toBe(true);
    expect(wrapper.find('.base-multi-select__selected').exists()).toBe(true);
    expect(wrapper.find('.base-multi-select__placeholder').exists()).toBe(true);
    expect(wrapper.find('.base-multi-select__options').exists()).toBe(true);
    expect(wrapper.find('.base-multi-select__label').exists()).toBe(false);
    expect(wrapper.find('.base-multi-select__error').exists()).toBe(false);
  });

  it('displays the label when the "label" prop is passed', () => {
    const label = 'Test Label';
    const wrapper = createWrapper({ label });

    expect(wrapper.find('.base-multi-select__label').exists()).toBe(true);
    expect(wrapper.find('.base-multi-select__label').text()).toBe(label);
  });

  it('displays the placeholder when no options are selected', () => {
    const placeholder = 'Select options';
    const wrapper = createWrapper({ placeholder });

    expect(wrapper.find('.base-multi-select__placeholder').exists()).toBe(true);
    expect(wrapper.find('.base-multi-select__placeholder').text()).toBe(placeholder);
    expect(wrapper.find('.base-multi-select__selected-text').exists()).toBe(false);
  });

  it('displays the selected options text when at least one option is selected', () => {
    const wrapper = createWrapper({ modelValue: ['option1'] });

    expect(wrapper.find('.base-multi-select__placeholder').exists()).toBe(false);
    expect(wrapper.find('.base-multi-select__selected-text').exists()).toBe(true);
    expect(wrapper.find('.base-multi-select__selected-text').text()).toBe('Option 1');
  });

  it('displays the selected options text separated by commas', () => {
    const wrapper = createWrapper({ modelValue: ['option1', 'option3'] });

    expect(wrapper.find('.base-multi-select__selected-text').text()).toBe('Option 1, Option 3');
  });

  it('opens the dropdown when clicking in the selected area', async () => {
    const wrapper = createWrapper();

    expect(wrapper.find('.base-multi-select').classes()).not.toContain('base-multi-select--open');
    expect(wrapper.find('.base-multi-select__options').isVisible()).toBe(false);

    await wrapper.find('.base-multi-select__selected').trigger('click');

    expect(wrapper.find('.base-multi-select').classes()).toContain('base-multi-select--open');
    expect(wrapper.find('.base-multi-select__options').isVisible()).toBe(true);
  });

  it('closes the dropdown when clicking in the selected area again', async () => {
    const wrapper = createWrapper();

    await wrapper.find('.base-multi-select__selected').trigger('click');
    expect(wrapper.find('.base-multi-select').classes()).toContain('base-multi-select--open');

    await wrapper.find('.base-multi-select__selected').trigger('click');
    expect(wrapper.find('.base-multi-select').classes()).not.toContain('base-multi-select--open');
  });

  it('closes the dropdown when clicking outside the component', async () => {
    const wrapper = createWrapper();

    await wrapper.find('.base-multi-select__selected').trigger('click');
    expect(wrapper.find('.base-multi-select').classes()).toContain('base-multi-select--open');

    clickOutside();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.base-multi-select').classes()).not.toContain('base-multi-select--open');
  });

  it('does not open the dropdown when the component is disabled', async () => {
    const wrapper = createWrapper({ disabled: true });

    expect(wrapper.find('.base-multi-select').classes()).toContain('base-multi-select--disabled');

    await wrapper.find('.base-multi-select__selected').trigger('click');

    expect(wrapper.find('.base-multi-select').classes()).not.toContain('base-multi-select--open');
    expect(wrapper.find('.base-multi-select__options').isVisible()).toBe(false);
  });

  it('displays the error message when the "error" prop is passed', () => {
    const error = 'This field is required';
    const wrapper = createWrapper({ error });

    expect(wrapper.find('.base-multi-select').classes()).toContain('base-multi-select--error');
    expect(wrapper.find('.base-multi-select__error').exists()).toBe(true);
    expect(wrapper.find('.base-multi-select__error').text()).toBe(error);
  });

  it('emits the update:modelValue event with the new value after clicking an option', async () => {
    const wrapper = createWrapper();

    await wrapper.find('.base-multi-select__selected').trigger('click');
    await wrapper.findAll('.base-multi-select__option')[0].trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([['option1']]);
  });

  it('adds the value to modelValue when the option is not selected', async () => {
    const wrapper = createWrapper({ modelValue: ['option2'] });

    await wrapper.find('.base-multi-select__selected').trigger('click');
    await wrapper.findAll('.base-multi-select__option')[0].trigger('click');

    expect(wrapper.emitted('update:modelValue')![0]).toEqual([['option2', 'option1']]);
  });

  it('removes the value from modelValue when the option is already selected', async () => {
    const wrapper = createWrapper({ modelValue: ['option1', 'option2'] });

    await wrapper.find('.base-multi-select__selected').trigger('click');
    await wrapper.findAll('.base-multi-select__option')[0].trigger('click');

    expect(wrapper.emitted('update:modelValue')![0]).toEqual([['option2']]);
  });

  it('highlights the selected options in the dropdown', async () => {
    const wrapper = createWrapper({ modelValue: ['option1'] });

    await wrapper.find('.base-multi-select__selected').trigger('click');

    const options = wrapper.findAll('.base-multi-select__option');
    expect(options[0].classes()).toContain('base-multi-select__option--selected');
    expect(options[1].classes()).not.toContain('base-multi-select__option--selected');
    expect(options[2].classes()).not.toContain('base-multi-select__option--selected');
  });

  it('changes the direction of the arrow icon when the dropdown is open', async () => {
    const wrapper = createWrapper();

    expect(wrapper.find('.base-multi-select__arrow').classes()).not.toContain(
      'base-multi-select__arrow--open',
    );

    await wrapper.find('.base-multi-select__selected').trigger('click');

    expect(wrapper.find('.base-multi-select__arrow').classes()).toContain(
      'base-multi-select__arrow--open',
    );
  });

  it('does not call toggleOption when the component is disabled', async () => {
    const wrapper = createWrapper({
      disabled: true,
      modelValue: ['option1'],
    });

    await wrapper.find('.base-multi-select__selected').trigger('click');

    const options = wrapper.findAll('.base-multi-select__option');
    if (options.length > 0) {
      await options[1].trigger('click');
    }

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });
});
