# vue-scroller

> A Vue.js project

## Install

``` bash
# install dependencies
npm install anima-vue-scroller --save

```JavaScript
require ('dist/main.css');

// ES6 mudule
import Scroller from 'vue-scroller';

# Usage

```HTML
<span @click="show('scroller')"></span>
<scroller @confirm="confirm" ref="scroller" @claer="claer" @change="changeValue" :scroll="scrollData"></scroller>
```

```JavaScript
export default {
  name: 'app',
  components: {
    Scroller
  },
  data () {
    return {
      scrollData: [{
        defaultValue: 1,
        data: [{
          name: '男',
          value: 0
        }, {
          name: '女',
          value: 1
        }, {
          name: '不限',
          value: 2
        }]
      }, {
        defaultValue: 2,
        data: [{
          name: '男',
          value: 0
        }, {
          name: '女',
          value: 1
        }, {
          name: '不限',
          value: 2
        }]
      }]
    }
  },
  methods: {
    changeValue (value) {
      console.log(value)
    },
    confirm (values) {
      console.log(values)
    },
    claer () {
      console.log('已关闭')
    },
    show (name) {
      this.$refs[name].open()
    }
  }
}