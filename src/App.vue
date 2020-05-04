<template>
  <div id="app">
    <div class="dd-info">
      <i>All the cards displayed below are Vue Slots and can be totally customized to be any way</i>
      <br/>
      <br/>
    </div>
    
    <drag-drop
      :dropzones="dropGroups"
      :dropzonesTitle="'XYZ Company Teams'"
      :originalData="stories"
      :originalTitle="'Tasks to be distributed'"
      :inPlace="true"
      :enableSave="true"
      :enableCancel="true"
      @dropInOriginalBucket="originalBucketDropEvent"
      @dropInDestinationBucket="destinationBucketDropEvent"
      @save="save"
      @cancel="cancel"
    >
      <template #dd-card="{ cardData }">
        <custom-card
          :data="cardData"
          @done="doneMarked"
        />
      </template>
    </drag-drop>
  </div>
</template>

<script>
/* istanbul ignore file */
import DragDrop from './vue-drag-n-drop.vue';
import CustomCard from './components/CustomCard.vue';

export default {
  name: 'app',
  components: {
    DragDrop,
    CustomCard
  },
  data() {
    return{
      stories: [
        {
          title: 'Strategy 101',
          description: 'Create a draft of business plan',
          time: '3 days',
          done: false
        },
        {
          title: 'Strategy 102',
          description: 'Finalize the plan',
          time: '4 days',
          done: false
        },
        {
          title: 'Tech diagram',
          description: 'Draw the tech data',
          time: '4 days',
          done: false
        },
        {
          title: 'Place Holder',
          description: 'Data Science Team',
          time: '5 days',
          done: false
        }
      ],

      dropGroups: [
        {
          name: 'Business Team',
          children: []
        },
        {
          name: 'Tech Dept',
          children: []
        },
        {
          name: 'Marketing Dept',
          children: []
        },
        {
          name: 'Accounting Dept',
          children: []
        }
      ]
    }
  },

  methods:{
    save(received){
      console.log("Received:", received)
    },

    doneMarked(data) {
      data.done = true;
      alert(data.title);
    },

    originalBucketDropEvent(result) {
      console.log("Original: ", result);
    },

    destinationBucketDropEvent(columnName, result) {
      console.log("Destination: ", columnName, result)
    },

    cancel() {
      console.log("Cancel hit");
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
