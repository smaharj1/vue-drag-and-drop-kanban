
# vue-drag-n-drop
![NPM build](https://github.com/smaharj1/vue-drag-and-drop-kanban/workflows/npm-publish/badge.svg?event=push) ![npm](https://img.shields.io/npm/v/vue-drag-n-drop?color=blue)

A simple kanban board where the items can be dragged and dropped from the list. This is a hybrid implementation of vue-smooth-dnd.

## Demo
![GIF Demo](https://raw.githubusercontent.com/smaharj1/vue-drap-drop-kanban/master/src/assets/demo.gif)

## Usage

#### Installation
To use the vue-drag-n-drop module, you first need to install the module.

```
npm install vue-drag-n-drop
```
or
```
yarn add vue-drag-n-drop
```

#### Use Case

``` html
<template>
  <div id="app">
    <drag-drop
      :dropzones="dropGroups"
      :dropzonesTitle="'Drop Zone'"
      :originalData="originalList"
      :originalTitle="'Original Data To Be distributed'"
      @save="saveClicked"
      @cancel="cancelClicked"
    ></drag-drop>
  </div>
</template>

<script>
import DragDrop from 'vue-drag-n-drop'

export default {
  components: {
    DragDrop
  },
  data() {
    return{
      originalList: [
        'Luka Modrić',
        'Mario Mandžukić',
        'Ivan Rakitić',
        'Harry Kane'
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
        }
      ]
    }
  },
}
</script>
```

## Contributions
Feel free to raise an issue or create a Pull Request if you see ways that can improve this library.

## License
[MIT](https://opensource.org/licenses/MIT)

