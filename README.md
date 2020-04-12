
# vue-drag-n-drop
![NPM build](https://github.com/smaharj1/vue-drag-and-drop-kanban/workflows/npm-publish/badge.svg?event=push) ![npm](https://img.shields.io/npm/v/vue-drag-n-drop?color=blue)
![npm](https://img.shields.io/npm/dt/vue-drag-n-drop)

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
      :dropzonesTitle="'XYZ Company Teams'"
      :originalData="stories"
      :originalTitle="'Tasks to be distributed'"
      :inPlace="true"
      :enableSave="true"
      :enableCancel="true"
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
import DragDrop from 'vue-drag-n-drop'
import MyComponent from './MyComponent.vue'

export default {
  components: {
    DragDrop,
    MyComponent
  },
  data() {
    return {
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
        }
      ]
    }
  },
}
</script>
```

`MyComponent.vue`
```html
<template>
  <div class="cc-card">
    <h3>{{data.title}}</h3>
    <p>
      {{data.description}}
    </p>
    <button v-if="!data.done" class="cc-btn" @click="markDone()">
      Mark Done
    </button>
  </div>
</template>

<script>
export default {
  name: 'MyComponent',
  props: ['data'],
  methods: {
    markDone() {
      this.$emit('done', this.data);
    }
  }
}
</script>
```

## Documentation
#### Instantiating the component
To put the component in your code, you can simply run `import DragDrop from 'vue-drag-n-drop';`. Then, use it in the code as:

```html
<drag-drop
  :dropzones="dropGroups"
  :dropzonesTitle="'XYZ Company Teams'"
  :originalData="stories"
  :originalTitle="'Tasks to be distributed'"
/>
```

`originalData` in the above code is assumed to be a list of string. However, you can also pass in the list of custom objects like this:

```js
[
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
  }
]
```

When you pass your own objects instead of a list of string, you also need to provide a custom component to handle view/action of this object since you can virtually pass any kind of object. 

#### Custom Component for list of objects
`vue-drag-n-drop` uses Vue Named Slots. So, the users can pass in custom component that will have access to the data for the single item. You can impolement the slots like below:

```html
<drag-drop
  :dropzones="dropGroups"
  :dropzonesTitle="'XYZ Company Teams'"
  :originalData="stories"
  :originalTitle="'Tasks to be distributed'"
>
  <template #dd-card="{ cardData }">
    <custom-card
      :data="cardData"
      @done="doneMarked"
    />
  </template>
</drag-drop>
```

Here, `dd-card` is the slot name. The component provides a `cardData` variable provides the access of a single object from the original data. If slots aren't used, the component assumes that original data is a list of string. This makes it compatible with older version.

## Contributions
Feel free to raise an issue or create a Pull Request if you see ways that can improve this library.

## License
[MIT](https://opensource.org/licenses/MIT)

