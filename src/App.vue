<template>
  <div id="app">
    <drag
      :dropzones="dropGroups"
      :dropzonesTitle="'Drop Zone'"
      :originalData="ajaxResult"
      :originalTitle="'Original Data To Be distributed'"
      @save="save"
    ></drag>
  </div>
</template>

<script>
import Drag from '@/components/Drag'

export default {
  name: 'app',
  components: {
    Drag
  },
  data() {
    return{
      ajaxResult: [
        '1 - yes no',
        '2 - no yes',
        '3 - handles: yes',
        '4 - very good: no',
        '5 - Very good: yes',
        '6 - new one',
        '7 - another one that is new' 
      ],

      dropGroups: [
        {
          name: 'England',
          children: [{
            id: '1',
            data:'1'
          }]
        },
        {
          name: 'Croatia',
          children: []
        },
        {
          name: 'Germany',
          children: []
        },
        {
          name: 'France',
          children: []
        },
        {
          name: "Belgium",
          children: []
        },
        {
          name: "USA",
          children: []
        }
      ]
    }
  },

  methods:{
    save(received){
      console.log("Received:", received)
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
