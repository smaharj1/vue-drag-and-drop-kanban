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
        'Luka Modrić',
        'Mario Mandžukić',
        'Ivan Rakitić',
        'Harry Kane',
        'Raheem Stirling',
        'Its coming home',
        'Neymar',
        'Kylian Mbappé',
        'Antoine Griezmann'
      ],

      dropGroups: [
        {
          name: 'England',
          children: []
        },
        {
          name: 'Croatia',
          children: []
        },
        {
          name: 'Brasil',
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
