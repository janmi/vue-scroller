<style lang="less">
@import url(../static/less/common.less);
  .show{
    display: block;
    width: 1.333333rem;
    height: 1.333333rem;
    margin: 1.333333rem;

  } 
</style>
<template>
  <div id="app">
  <span class="show" @click="show('scroller')">show address</span>
  <span class="show" @click="show('fuck')">show address</span>
    <scroller @confirm="confirm" ref="scroller" @claer="claer" @change="changeValue" :scroll="scrollData"></scroller>
    <scroller @confirm="confirm2" ref="fuck" @claer="claer"  :scroll="scrollData"></scroller>
    <p id="J_address" style="text-align: center;">{{addressStr}}</p>
  </div> 
</template>

<script>
import Scroller from '../src/index.js'
import CityData from '../static/json/citydata.json'
export default {
  name: 'app',
  components: {
    Scroller
  },
  data () {
    return {
      addressStr: '',
      defaultValue: [{
        name: '天津',
        value: '120000'
      }, {
        name: '天津市',
        value: '120100'
      }, {
        name: '北辰区',
        value: '120113'
      }],
      scrollData: [
        {
          defaultValue: '',
          data: []
        }, {
          defaultValue: '',
          data: []
        }
      ],
      scrollData2: [
        {
          defaultValue: '',
          data: []
        }, {
          defaultValue: '',
          data: []
        }, {
          defaultValue: '',
          data: []
        }
      ],
      selectValue: []
    }
  },
  created () {
    this.readProvince(this.defaultValue[0])
    this.readCity(this.defaultValue[1])
    // this.readArea(this.defaultValue[1])

    this.scrollData[0].data = this.provinceData
    this.scrollData[0].defaultValue = this.defaultValue[0].value
    this.scrollData[1].data = this.cityData
    this.scrollData[1].defaultValue = this.defaultValue[1].value
    // this.scrollData[2].data = this.areaData
    // this.scrollData[2].defaultValue = this.defaultValue[2].value

    this.selectValue[0] = this.defaultValue[0]
    this.selectValue[1] = this.defaultValue[1]
    // this.selectValue[2] = this.defaultValue[2]
  },
  mounted () {
  },
  methods: {
    // 读取省份数据
    readProvince (options) {
      this.provinceData = []
      options = options || {
        value: CityData[0].code,
        name: CityData[0].name
      }
      this.provinceIndex = 0
      var obj = {}
      if (CityData) {
        var data = CityData
        for (var i = 0, len = data.length; i < len; i++) {
          obj.name = data[i].name
          obj.value = data[i].code
          this.provinceData.push(obj)
          obj = {}
          // 将默认或者当前选择的省索引保存
          if (data[i].code === options.value) {
            this.provinceIndex = i
          }
        }
      }
    },
    // 读取市数据
    readCity (options) {
      this.cityData = []
      this.cityIndex = 0
      options = options || {
        value: CityData[0].code,
        name: CityData[0].name
      }
      var obj = {}
      if (CityData) {
        var data = CityData[this.provinceIndex].children
        for (var i = 0, len = data.length; i < len; i++) {
          obj.name = data[i].name
          obj.value = data[i].code
          this.cityData.push(obj)
          obj = {}
          // 将默认或者当前选择的市索引保存
          if (data[i].code === options.value) {
            this.cityIndex = i
          }
        }
      }
    },
    // 读取区数据
    readArea (options) {
      this.areaData = []
      options = options || {
        value: this.cityData[0].value,
        name: this.cityData[0].name
      }
      var obj = {}
      if (CityData) {
        // 根据保存的省、市索引直接获取到区的数据，节省两个外套循环
        var data = CityData[this.provinceIndex].children[this.cityIndex].children
        for (let i = 0, len = data.length; i < len; i++) {
          obj.name = data[i].name
          obj.value = data[i].code
          this.areaData.push(obj)
          obj = {}
        }
      }
    },
    confirm (values) {
      console.log(values)
      // this.addressStr = values[0].name + '-' + values[1].name + '-' + values[2].name
    },
    confirm2 (values) {
      console.log(values)
      // this.addressStr = values[0].name + '-' + values[1].name + '-' + values[2].name
    },
    claer (values) {
      console.log('x')
    },
    changeValue (values) {
      console.log('fuck')
      const that = this
      if (values[0].value !== that.selectValue[0].value) {
        that.selectValue[0] = values[0]
        for (let i = 0, len = that.provinceData.length; i < len; i++) {
          // // 将默认或者当前选择的省索引保存
          if (that.provinceData[i].value === values[0].value) {
            that.provinceIndex = i
            break
          }
        }
        that.readCity(values[0])
        that.scrollData[1].data = that.cityData
        that.cityIndex = 0 // 切换市，归零
        // that.readArea()
        // that.scrollData[2].data = that.areaData
      }

      if (values[1] && values[1].value !== that.selectValue[1].value) {
        that.selectValue[1] = values[1]
        for (let i = 0, len = that.cityData.length; i < len; i++) {
          // 将默认或者当前选择的市索引保存
          if (that.cityData[i].value === values[1].value) {
            that.cityIndex = i
            break
          }
        }
        // that.readArea({value: values[1].value, name: values[1].name})
        // that.scrollData[2].data = that.areaData
      }
    },
    open () {
      this.$refs['scroller'].open()
    },
    show (name) {
      this.$refs[name].open()
    }
  }
}
</script>
