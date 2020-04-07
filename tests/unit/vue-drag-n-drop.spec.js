import { shallowMount } from '@vue/test-utils'
import DragDrop from '@/vue-drag-n-drop.vue'
import _ from 'lodash';

jest.mock('lodash')

describe('vue-drag-n-drop.vue', () => {
  let props, wrapper;
  beforeEach(() => {
    props = {
      originalData: [
        'item1',
        'item2',
        'item3'
      ],
      dropzones: [
        {
          name: 'Zone1',
          children: [
            'zchild1',
            'zchild2'
          ]
        },
        {
          name: 'Zone2',
          children: []
        },
        {
          name: 'Zone3',
          children: []
        }
      ]
    };


    wrapper = shallowMount(DragDrop, {
      propsData: props,
    });
  });

  // Checks if the component renders.
  it('renders the component', () => {
    expect(wrapper.contains('div')).toBe(true);
  });

  it('provides default original list title if prop is not provided', () => {
    expect(wrapper.props().originalTitle).toEqual('Original List');
  });

  it('provides default dropzone title if not in props', () => {
    expect(wrapper.props().dropzonesTitle).toEqual('Distribution data');
  });

  it('provides default dropzone title if not in props', () => {
    expect(wrapper.props().errorMessage).toContain('All the original list have not been dragged to appropriate containers yet. Please do so and try again.');
  });

  it('deep clones the dropzones', () => {
    expect(_.cloneDeep).toHaveBeenCalledWith(wrapper.props().dropzones);
  });

  it('runs the validation of original list and emits save event on valid data on save click', () => {
    wrapper.vm.validateIfOriginalEmpty = jest.fn().mockReturnValue(true);
    wrapper.find('button.save').trigger('click');

    expect(wrapper.vm.validateIfOriginalEmpty).toHaveBeenCalled();
    expect(wrapper.vm.notifyError).toBe(false);
    expect(wrapper.emitted().save).toBeTruthy();

    // ------------
    // Tests if the validateIfOriginalEmpty() sends true/false
    wrapper.vm.validateIfOriginalEmpty = jest.fn().mockReturnValue(false);
    wrapper.find('button.save').trigger('click');
    expect(wrapper.vm.validateIfOriginalEmpty).toHaveBeenCalled();
    expect(wrapper.vm.notifyError).toBe(true);
  });

  it('emits cancel when cancel button is clicked', () => {
    wrapper.find('button.cancel').trigger('click');
    expect(wrapper.emitted().cancel).toBeTruthy();
  })

  it('validates if items list is empty or not', () => {
    wrapper.setData({
      items: []
    });

    let returned = wrapper.vm.validateIfOriginalEmpty();
    expect(returned).toBe(true);

    wrapper.setData({
      items: ['sdf']
    });

    returned = wrapper.vm.validateIfOriginalEmpty();
    expect(returned).toBe(false);
  });

  it('gets the card payload when the card payload is requested', () => {
    wrapper.setData({
      dropGroups: [
        {
          name: 'Zone1',
          children: [
            'zchild1',
            'zchild2'
          ]
        }
      ]
    })
    const resp = wrapper.vm.getCardPayload('Zone1');
    expect(resp(0)).toEqual('zchild1');
  });

  
  
})
