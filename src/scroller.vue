<style lang="less">
  .u-scroller{
    position: fixed;
    top: 0;
    left:0;
    z-index: 9999;
    visibility: hidden;
    width: 100%;
    height: 100%;
  }
  .u-scroller-mark{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    opacity: 0;
    visibility: hidden;
  }
  .u-scroller-hd{
    position: relative;
    display: flex;
    width: 100%;
    height:45px;
    line-height:45px;
    font-size: 16px;
    &:after{
      content:"";
      position: absolute;
      bottom:0px;
      left:0px;
      width: 100%;
      border-bottom: 1px solid #d0d0d0;
      transform:scaleY(.5);
      transform-origin:0 100%;
    }
    span{
      display: block;
      flex: 1;
      text-align: center;
    }
  }
  .u-scroller-mod{
    position: absolute;
    bottom: 0;
    left:0;
    width: 100%;
    background-color: #fff;
    transform: translateY(100%);
    backface-visibility: hidden;
    transition: .5s ease;
  }
  .u-scroller-bd{
    display: flex;
    .scroller-component{
      flex:1;
    }
  }
  .u-scroller.active{
    visibility: visible;
    .u-scroller-mark{
      visibility:visible;
      opacity:1;
    }
    .u-scroller-mod {
      transform: translateY(0);
    }
  }
</style>
<template>
  <div class="u-scroller" :class="{'active': isShow}">
    <div class="u-scroller-mark"></div>
    <div class="u-scroller-mod">
      <div class="u-scroller-hd">
        <span @click="close('claer')" class="u-scroller-claer">取消</span>
        <span @click="confirm('confirm')" class="u-scroller-confirm">确认</span>
      </div>
      <div class="u-scroller-bd">
        <scroll-slot @change-solt="getData"  v-for="(item, index) in scroll" :slot-index="index"  :scroll-data="item.data || item" :default-value="item.defaultValue || 0"></scroll-slot>
      </div>
    </div>
  </div>
</template>
<script>
  import scrollSlot from './scroller-slot.vue'
  export default {
    name: 'scroller',
    components: { scrollSlot },
    props: ['scroll'],
    data () {
      return {
        isShow: false,
        selectedValues: []
      }
    },
    mounted () {
      const that = this
      that.scroll.forEach((item) => {
        var defaultValue = item.defaultValue || 0
        if (typeof item === 'object') {
          for (let i = 0; i < item.data.length; i++) {
            if (item.data[i].value === defaultValue) {
              that.selectedValues.push(item.data[i])
            }
          }
        } else {
          for (let i = 0; i < item.length; i++) {
            if (item.data[i] === defaultValue) {
              that.selectedValues.push(item.data[i])
            }
          }
        }
      })
    },
    methods: {
      getData (index, value) {
        // console.log(value)
        const that = this
        that.selectedValues[index] = value
        // console.log(that.selectedValues)
        this.$emit('change', that.selectedValues)
      },
      open () {
        const that = this
        that.isShow = true
      },
      close (event) {
        this.isShow = false
        this.$emit(event)
      },
      confirm (event) {
        this.$emit(event, this.selectedValues)
        this.isShow = false
      }
    }
  }

</script> 
