<style lang="less">
  @import '../src/assets/less/reset.less';
  .show{
    display: block;
    width: 1.333333rem;
    height: 1.333333rem;
    margin: 1.333333rem;
  }
</style>
<template>
  <div id="app">
  <span class="show" @click="show('scroller')">show Scroll</span>
    <scroller @confirm="confirm" ref="scroller" @claer="claer" @change="changeValue" :scroll="scrollData"></scroller>
  </div>
</template>

<script>
import Scroller from '../src/index.js'

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
      }],
      fuckData: [{
        data: ['男', '女', '不限']
      }]
    }
  },
  mounted () {
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
    },
    test () {
      const that = this
      window.setTimeout(() => {
        that.scrollData[0].data.push({name: '人妖', value: '3'})
        that.scrollData[1].data.push({name: '人妖', value: '3'})
      }, 3000)
    }
  }
}
</script>
