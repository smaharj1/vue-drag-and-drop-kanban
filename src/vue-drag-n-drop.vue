<template>
  <div>
    <h2>
      {{originalTitle}}
    </h2>
    <div class="result-group"> 
        <Container 
          @drop="onDrop" 
          group-name="col"
          :orientation="'horizontal'"
          :get-child-payload="getOriginalCardPayload()"
          drag-class="card-ghost"
          drop-class="card-ghost-drop">
          <Draggable v-for="(item, iind) in items" :key="iind">
            <slot name="dd-card" v-bind:cardData="item">
              <div class="card">
                <p>
                {{item}}
                </p>
              </div>
            </slot>
          </Draggable>
        </Container>
    </div>
    <hr>
    <h2>
      {{dropzonesTitle}}
    </h2>
    <div class="result-group">
      
      <div 
        v-for="(item,ind) in dropGroups"
        v-bind:key="ind"
        class="card-container">
        {{item.name}}
        <Container 
          group-name="col"
          @drop="(e) => onCardDrop(item.name, e)"
          :get-child-payload="getCardPayload(item.name)"
          drag-class="card-ghost"
          drop-class="card-ghost-drop"
        >
          <Draggable v-for="(card, cid) in item.children" :key="cid">
            <slot name="dd-card" v-bind:cardData="card">
              <div class="card">
                <p>
                  {{card}}
                </p>
              </div>
            </slot>
          </Draggable>
        </Container>

      </div>
    </div>

    <div class="drop-actions" v-if="enableSave || enableCancel">
      <button class="button save" v-if="enableSave" @click="saveClicked()">
        Save
      </button>
      <button class="button cancel" v-if="enableCancel" @click="cancelClicked()">
        Cancel
      </button>
    </div>

  </div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import _ from 'lodash';
import RequiredProps from './drag-n-drop-props.js';

export default {
  name: "VueDragNDrop",
  components: { Container, Draggable },
  props: RequiredProps,

  data: function () {
    return {
      items:[],
      dropGroups: [],
    }
  },

  created() {
    if (this.inPlace) {
      this.items = this.originalData;
      this.dropGroups = this.dropzones;
    }
    else {
      this.items = _.cloneDeep(this.originalData);
      this.dropGroups = _.cloneDeep(this.dropzones);
    }
  },

  methods: {
    /** 
     * Even that runs when an item is dropped in the original list bucket.
     * @param {Object} dropResult Holds the value of what is dropped.
     * @public
    */
    onDrop(dropResult){
      this.items = this.applyDrag(this.items, dropResult);
    },

    /** 
     * Runs when the card is dropped in any of the drop buckets. Handles the dropping into new bucket and 
     * removing from original bucket.
     * @param {String} columnId Holds the ID of the original bucket tot get the card.
     * @param {Object} dropResult Holds the drop result.
    */
    onCardDrop(columnId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {

        if(dropResult.removedIndex !== null){
          let found = this.dropGroups.filter(p => p.name === columnId)[0];
          found.children.splice(dropResult.removedIndex, 1);
        }

        if (dropResult.addedIndex !== null){
          let found = this.dropGroups.filter(p => p.name === columnId)[0];
          found.children.splice(dropResult.addedIndex, 0, dropResult.payload);
        }
      }
    },

    /** 
     * Gets the card payload
     * @param {String} Holds the ID.
    */
    getCardPayload(id){
      let that = this;
      return function(index) {
        let found = that.dropGroups.filter(p => p.name === id)[0].children[
          index
        ];

        return found;
      }
    },

    /** 
     * Same as card payload but this is only implemented in original list.
     * @public
    */
    getOriginalCardPayload(){
      let that = this;
      return function(index){
        return that.items[index];
      }
    },

    /** 
     * Applies the dragging result. It removes the item from original bucket and keeps it in new new list.
     * @param {Array} arr Holds the array.
     * @param {Object} dragResult Holds the drag information.
     * @returns the new corrected list.
     * @public
    */
    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult
      if (removedIndex === null && addedIndex === null) return arr

      const result = [...arr]
      let itemToAdd = payload

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0]
      }

      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd)
      }

      return result;
    },

    /** 
     * Runs when save button is clicked. It first validates if all the items from the original list is empty.
     * @public
    */
    saveClicked() {
      /** 
       * @event save Emits when save is clicked so that the parent component can appropriately handle it.
       * @type {Object} 
      */
      this.$emit('save', {
        dropzones: this.dropGroups,
        originalBucket: this.items
      });
    },

    cancelClicked() {
      /** 
       * @event cancel Handles the cancellation.
      */
      this.$emit("cancel");
    }
  }
}
</script>

<style>


.draggable-item-horizontal{
    padding: 10px;
    text-align: center;
    /* width : 200px; */
    display: block;
    background-color: #fff;
    outline: 0;
    border: 1px solid rgba(0,0,0,.125);
    margin-right: 4px;
}

.card-container{
  display: inline-block;
  vertical-align: top;
  width: 210px;
  padding: 10px;
  margin: 5px;
  min-height: 5em;
  margin-right: 10px;
  white-space: normal;
  background-color: #f3f3f3;
  box-shadow: 0 1px 1px rgba(0,0,0,0.12), 0 1px 1px rgba(0,0,0,0.24);
}

.card{
  margin: 5px;
  width: 200px;
  background-color: white;
  box-shadow: 0 1px 1px rgba(0,0,0,0.12), 0 1px 1px rgba(0,0,0,0.24);
  padding: 10px;
}

.card-ghost {
  transition: transform 0.18s ease;
  transform: rotateZ(5deg)
}

.card-ghost-drop{
  transition: transform 0.18s ease-in-out;
  transform: rotateZ(0deg)
}

.drag-drop{
  width: 80%;
  margin: auto;
}

.result-group {
  overflow-x: auto;
  white-space: nowrap;
}

.drop-actions{
  text-align: center;
  margin: 10px 0px;
}

.drop-actions button
{
  margin-right: 10px;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
}

.save{
  background: #5cdb95 !important;
  border: none;

}
.error-original{
  background: #FF3860;
  color: white;
  border-left: 5px solid #9E001D;
  padding: 20px;
  margin: 10px 0px;
}

</style>
