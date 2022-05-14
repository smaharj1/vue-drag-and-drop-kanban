import VueDragNDrop from "./vue-drag-n-drop.vue";

const VueDragDropComponent = {
 install(Vue, options) {
  // Let's register our component globally
  // https://vuejs.org/v2/guide/components-registration.html
  Vue.component("vue-drag-n-drop", VueDragNDrop);
 }
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueDragDropComponent);
}

export default VueDragDropComponent;