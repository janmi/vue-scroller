<style>
  .scroller-component {
    display: block;
    position: relative;
    height: 238px;
    overflow: hidden;
    width: 100%;
  }

  .scroller-content {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1;
  }

  .scroller-mask {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    margin: 0 auto;
    width: 100%;
    z-index: 3;
    background-image:
      -webkit-linear-gradient(top, rgba(255,255,255,0.95), rgba(255,255,255,0.6)),
      -webkit-linear-gradient(bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.6));
    background-image:
      linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.6)),
      linear-gradient(to top, rgba(255,255,255,0.95), rgba(255,255,255,0.6));
    background-position: top, bottom;
    background-size: 100% 102px;
    background-repeat: no-repeat;
  }

  .scroller-item {
    text-align: center;
    font-size: 16px;
    height: 34px;
    line-height: 34px;
    color: #000;
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
  }

  .scroller-indicator {
    width: 100%;
    height: 34px;
    position: absolute;
    left: 0;
    top: 102px;
    z-index: 3;
    background-image:
      -webkit-linear-gradient(top, #d0d0d0, #d0d0d0, transparent, transparent),
      -webkit-linear-gradient(bottom, #d0d0d0, #d0d0d0, transparent, transparent);
    background-image:
      linear-gradient(to bottom, #d0d0d0, #d0d0d0, transparent, transparent),
      linear-gradient(to top, #d0d0d0, #d0d0d0, transparent, transparent);
    background-position: top, bottom;
    background-size: 100% 1px;
    background-repeat: no-repeat;
  }
</style>
<template>
  <div class="scroller-component" :class="el" data-role="component">
    <div class="scroller-mask" data-role="mask"></div>
    <div class="scroller-indicator" data-role="indicator"></div>
    <div class="scroller-content" data-role="content">
      <template  v-for="item in scrollData">
        <p class="scroller-item" :data-value="item.value || item" :data-name="item.name || item">
          {{item.name || item}}
        </p>
      </template>
    </div>
  </div>
</template>
<script>
  import Members from './assets/js/members'
  export default {
    name: 'scrollerSlot',
    props: {
      scrollData: {
        type: Array,
        required: true
      },
      defaultValue: {
        required: true
      },
      el: {
        type: String,
        required: true
      },
      slotIndex: {
        type: Number
      }
    },
    data () {
      return {
        selectedValue: {}
      }
    },
    mounted () {
      const that = this
      that.init('.' + that.el, {
        onSelect (value) {
          that.selectedValue = value
          that.$emit('changeSolt', that.slotIndex, that.selectedValue)
        }
      })
    },
    methods: {
      getElement (expr) {
        return (typeof expr === 'string') ? document.querySelector(expr) : expr
      },
      getComputedStyle1 (el, key) {
        var computedStyle = window.getComputedStyle(el)
        return computedStyle[key] || ''
      },
      init (container, options) {
        this.members = Members()
        const that = this.members
        options = options || {}
        that.options = {
          itemClass: 'scroller-item',
          onSelect: function () {},
          defaultValue: this.defaultValue || 0,
          data: this.scrollData
        }

        for (var key in options) {
          if (options[key] !== undefined) {
            that.options[key] = options[key]
          }
        }
        var component = that.__component = this.getElement(container)
        var content = that.__content = component.querySelector('[data-role=content]')
        var indicator = component.querySelector('[data-role=indicator]')
        that.__itemHeight = parseInt(this.getComputedStyle1(indicator, 'height'), 10)
        that.__callback = options.callback || function (top) {
          content.style.webkitTransform = 'translate3d(0, ' + (-top) + 'px, 0)'
        }

        var rect = component.getBoundingClientRect()

        that.__clientTop = (rect.top + component.clientTop) || 0

        that.__setDimensions(component.clientHeight, content.offsetHeight)

        that.select(that.options.defaultValue, false)

        component.addEventListener('touchstart', function (e) {
          if (e.target.tagName.match(/input|textarea|select/i)) {
            return
          }
          e.preventDefault()
          that.__doTouchStart(e.touches, e.timeStamp)
        }, false)

        component.addEventListener('touchmove', function (e) {
          that.__doTouchMove(e.touches, e.timeStamp)
        }, false)

        component.addEventListener('touchend', function (e) {
          that.__doTouchEnd(e.timeStamp)
        }, false)
      }
    },
    watch: {
      scrollData (val, oldVal) {
        const that = this.members
        that.__setDimensions(that.__component.clientHeight, that.__content.offsetHeight)
        that.select(that.options.defaultValue, false)
      }
    }
  }

</script> 