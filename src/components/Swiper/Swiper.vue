<template>
  <div class="im-swipe">
    <div class="im-swipe-box" :style="dragStyleObject">
      <div class="im-swipe-box-item" v-if="loop" v-html="lastItem"></div>
      <slot></slot>
      <div class="im-swipe-box-item" v-if="loop" v-html="firstItem"></div>
    </div>
    <div class="im-swipe-dots-box">
      <span
        class="im-swipe-dots-box-dot"
        v-for="(v, k) in itemsArr.length"
        :key="k"
        :style="[{ backgroundColor: k === dotIndex ? dotActiveColor : dotColor }, wh]">
      </span>
    </div>
  </div>
</template>

<script>
import getDocumentFontSize from '../../helper/getDocumentFontSize'
export default {
  name: 'im-swiper',
  data () {
    return {
      dragStyleObject: {
        transitionDuration: this.speed,
        transform: 0
      },
      currentIndex: 0,
      dotIndex: 0,
      itemsArr: [],
      timerByAutoPlay: null,
      lastItem: null,
      firstItem: null,
      length: 0
    }
  },
  props: {
    speed: {
      type: [Number, String],
      default: 350
    },
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: [Number, String],
      default: 3000
    },
    idx: {
      type: [Number, String],
      default: 0,
      validator (val) {
        return /^\d*$/.test(val)
      }
    },
    dotColor: {
      type: String,
      default: '#fff'
    },
    dotActiveColor: {
      type: String,
      default: '#f00'
    },
    isTabView: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.supportTouch = (window.Modernizr && !!window.Modernizr.touch) || (function () {
      return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) // eslint-disable-line
    })()

    this.cloneItem()

    this.supportTouch ? this.bindSwipeHandle() : this.noop()

    if (~~this.autoPlay > 0) this.autoPlayHandle()
  },
  destroyed () {
    clearTimeout(this.timerByAutoPlay)
  },
  computed: {
    wh () {
      let fz = parseInt(getDocumentFontSize())
      return {
        width: ~~(fz * 0.2) + 'px',
        height: ~~(fz * 0.2) + 'px'
      }
    }
  },
  methods: {
    init () {
      this.itemsArr = this.$children.filter(item => item.$options.name === 'im-swiper-item')
      this.length = this.itemsArr.length
      if (this.loop) {
        this.currentIndex = 1
        if (this.idx > 0) {
          this.currentIndex = ~~this.idx + 1
        }
        this.setTranslate(0, -(this.$el.clientWidth * this.currentIndex))
      } else {
        this.currentIndex = 0
        if (this.idx > 0) {
          this.currentIndex = ~~this.idx
        }
        this.setTranslate(0, -(this.$el.clientWidth * this.currentIndex))
      }
    },
    autoPlayHandle () {
      this.timerByAutoPlay = setInterval(() => {
        if (!!this.loop === false && this.currentIndex >= this.length - 1) {
          clearTimeout(this.timerByAutoPlay)
          return
        }
        this.currentIndex++
        this.onswiper(1)
      }, this.autoPlay)
    },
    cloneItem () {
      if (this.itemsArr.length <= 1 || !!this.loop === false) return
      const itemArr = this.itemsArr
      this.firstItem = itemArr[0].$el.innerHTML
      this.lastItem = itemArr[itemArr.length - 1].$el.innerHTML
    },
    setTranslate (speed, translate) {
      this.dragStyleObject.transitionDuration = speed + 'ms'
      this.dragStyleObject.transform = `translate3d(${translate}px, 0, 0)`
    },
    noop () {

    },
    bindSwipeHandle () {
      this.swipeEv(this.$el)
    },
    swipeEv (element = window, type, handle) {
      let isTouchMove
      let touchStatus = Object.create(null)

      element.addEventListener('touchstart', (evt) => {
        clearTimeout(this.timerByAutoPlay)
        let touches = evt.touches[0]

        touchStatus.startTime = new Date().getTime()
        touchStatus.startTx = touches.pageX
        touchStatus.startTy = touches.pageY

        isTouchMove = false
      }, false)

      element.addEventListener('touchmove', (evt) => {
        evt.preventDefault()
        let touches = evt.touches[0]
        isTouchMove = true

        touchStatus.currentTx = touches.pageX - touchStatus.startTx
        touchStatus.currentTy = touches.pageY - touchStatus.startTy

        if (Math.atan2(Math.abs(touchStatus.currentTy), Math.abs(touchStatus.currentTx)) * 180 / Math.PI > 30) {
          return
        }

        this.setTranslate(0, touchStatus.currentTx + -(this.$el.clientWidth * this.currentIndex))
      }, false)

      element.addEventListener('touchend', (evt) => {
        if (!isTouchMove) {
          this.$emit('tap-swiper', this.currentIndex)
          return
        }

        if (Math.atan2(Math.abs(touchStatus.currentTy), Math.abs(touchStatus.currentTx)) * 180 / Math.PI > 30) {
          return
        }

        touchStatus.endTime = new Date().getTime()

        touchStatus.moveTime = touchStatus.endTime - touchStatus.startTime

        touchStatus.boundary = touchStatus.moveTime > 300 ? this.$el.offsetWidth / 2 : 14

        if (touchStatus.currentTx > touchStatus.boundary) {
          if (+this.length === 1) {
            this.onswiper(0)
            return
          }

          if (!!this.loop === false && +this.currentIndex === 0) {
            this.onswiper(0)
            return
          }

          this.$emit('on-swiper', -1)
          if (this.isTabView) {
            // 如果是tab轮播View，这里则返回，因为父组件的watch会触发轮播事件，设计方式尚不合理
            return
          }
          this.currentIndex--
          this.onswiper(-1)
        } else if (touchStatus.currentTx < -touchStatus.boundary) {
          if (+this.length === 1) {
            this.onswiper(0)
            return
          }

          if (!!this.loop === false && this.currentIndex >= this.length - 1) {
            this.onswiper(0)
            return
          }

          this.$emit('on-swiper', 1)
          if (this.isTabView) {
            // 如果是tab轮播View，这里则返回，因为父组件的watch会触发轮播事件，设计方式尚不合理
            return
          }
          this.currentIndex++
          this.onswiper(1)
        } else {
          this.onswiper(0)
        }

        touchStatus = Object.create(null)

        if (this.autoPlay > 0) this.autoPlayHandle()
      }, false)
    },
    onswiper () {
      this.setTranslate(this.speed, -(this.$el.clientWidth * this.currentIndex))

      if (this.loop) {
        if (+this.currentIndex === this.length + 1) {
          this.currentIndex = 1
          setTimeout(() => {
            this.setTranslate(0, -(this.$el.clientWidth * 1))
          }, this.speed)
        } else if (+this.currentIndex === 0) {
          this.currentIndex = this.length
          setTimeout(() => {
            this.setTranslate(0, -(this.$el.clientWidth * this.length))
          }, this.speed)
        }
      }
    }
  },
  watch: {
    currentIndex (val) {
      this.dotIndex = this.loop ? val - 1 : val
    },
    idx (newVal, oldVal) {
      let diff = newVal - oldVal
      let counts = 0
      let n = diff > 0 ? 1 : -1
      while (counts !== diff) {
        counts += n
        this.currentIndex += n
        this.onswiper(n)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../../less/base.less';

@effect-duration: .3s;

.@{prefixClass} {
  &-swipe {
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    &-box {
      width: 100%;
      height: 100%;
      display: flex;
      transition: @effect-duration;
      &-item {
        width: 100%;
        height: 100%;
        flex-shrink: 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    &-dots-box {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate3d(-50%,0,0);
      height: 1px * @baseRem;
      display: flex;
      justify-content: center;
      align-items: center;
      &-dot {
        display: block;
        /*安卓上面如果px单位带有小数，则会出现圆形变形的情况，使用计算属性动态计算取整*/
        /*width: .1px * @baseRem;*/
        /*height: .1px * @baseRem;*/
        border-radius: 50%;
        margin: 0 .1px * @baseRem;
      }
    }
  }
}

</style>
