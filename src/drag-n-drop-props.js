/* istanbul ignore file */
export default {
  /**
   * Holds the main data list to distribute.
   */
  originalData: {
    type: Array,
    required: true,
  },

  /**
   * Holds the drop buckets.
   */
  dropzones: {
    type: Array,
    required: true,
  },

  /**
   * Title for the original list.
   */
  originalTitle: {
    type: String,
    required: false,
    default: "Original List",
  },

  /**
   * Title for the drop buckets.
   */
  dropzonesTitle: {
    type: String,
    required: false,
    default: "Distribution data",
  },

  /**
   * An option to have an in-place changes. So, the props passed into the component itself would change.
   * If true, all the drags and drops done in this component is reflected in parent's objects.
   * If false, you need to have save button to get all the changes to the parent component.
   */
  inPlace: {
    type: Boolean,
    required: false,
    default: true,
  },

  /**
   * Enables save button
   */
  enableSave: {
    type: Boolean,
    required: false,
    default: true,
  },

  /**
   * Enables cancel button
   */
  enableCancel: {
    type: Boolean,
    required: false,
    default: true,
  },
};
