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
          <Draggable v-for="item in items" :key="item.id">
            <div class="card">
              <p>
              {{item.data}}
              </p>
            </div>
          </Draggable>
        </Container>
    </div>
    <div v-if="notifyError" class="error-original">
      {{errorMessage}}
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
          <Draggable v-for="card in item.children" :key="card.id">
            <div class="card">
              <p>
                {{card.data}}
              </p>
            </div>
          </Draggable>
        </Container>

      </div>
    </div>

    <div class="drop-actions">
      <button class="button" @click="saveClicked()">
        Save
      </button>
      <button class="button" @click="cancelClicked()">
        Cancel
      </button>
    </div>

  </div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import _ from 'lodash'

export default {
  name: "Drag",
  components: { Container, Draggable },
  props: {
    originalData: {
      type: Array,
      required: true
    },

    dropzones: {
      type: Array,
      required: true
    },

    originalTitle:{
      type: String,
      required: false,
      default: 'Original List'
    },

    dropzonesTitle: {
      type: String,
      required: false,
      default: 'Distribution data'
    },

    errorMessage: {
      type: String,
      required: false,
      default: 'All the original list have not been dragged to appropriate containers yet. Please do so and try again. '
    }
  },

  data: function () {
    return {
      items:[],
      dropGroups: [],
      notifyError: false,
    }
  },

  created() {
    this.originalData.forEach(ele => {
      let item = {
        id: ele,
        data: ele
      };

      this.items.push(item);
    });

    this.dropGroups = _.cloneDeep(this.dropzones);
  },

  methods: {
    onDrop(dropResult){
      this.items = this.applyDrag(this.items, dropResult);
    },

    onCardDrop(columnId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        
        if (dropResult.addedIndex !== null){
          let found = this.dropGroups.filter(p => p.name === columnId)[0];
          found.children.splice(dropResult.addedIndex, 0, dropResult.payload)
        }

        if(dropResult.removedIndex !== null){
          let found = this.dropGroups.filter(p => p.name === columnId)[0];
          found.children.splice(dropResult.removedIndex, 1);
        }
      }
    },

    getCardPayload(id){
      let that = this;
      return function(index) {
        let found = that.dropGroups.filter(p => p.name === id)[0].children[
          index
        ];

        return found;
      }
    },

    getOriginalCardPayload(){
      let that = this;
      return function(index){
        return that.items[index];
      }
    },

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

    validateIfOriginalEmpty(){
      return this.items && this.items.length === 0;
    },

    saveClicked() {
      let validated = this.validateIfOriginalEmpty();
      
      if(validated){
        this.$emit('save',this.dropGroups);
        this.notifyError = false;
      }
      else {
        this.notifyError = true;
      }
    },

    cancelClicked() {
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
  margin-right: 10px;
  white-space: normal;
  background-color: #f3f3f3;
  box-shadow: 0 1px 1px rgba(0,0,0,0.12), 0 1px 1px rgba(0,0,0,0.24);
}

.card{
  margin: 5px;
  width: 200px;
  /* border: 1px solid #ccc; */
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
}

.error-original{
  background: #FF3860;
  color: white;
  border-left: 5px solid #9E001D;
  padding: 20px;
  margin: 10px 0px;
}

</style>
