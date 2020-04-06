import { shallowMount } from '@vue/test-utils'
import DragDrop from '@/vue-drag-n-drop.vue'
import _ from 'lodash'

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
          children: []
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
      propsData: props
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
})
