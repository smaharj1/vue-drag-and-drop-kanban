import { shallowMount } from '@vue/test-utils'
import DragDrop from '@/vue-drag-n-drop.vue'

describe('vue-drag-n-drop.vue', () => {
  let props, wrapper;
  beforeEach(() => {
    props = {
      originalData: [],
      dropzones: []
    };

    wrapper = shallowMount(DragDrop, {
      propsData: props
    });
  })
  it('renders the component', () => {
    expect(wrapper.contains('div')).toBe(true);
  });
})
