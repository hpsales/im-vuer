<template>
  <div class="im-picker">

    <div @click="clockLayer" v-if="showLayer" class="layer"></div>

    <div class="im-picker-box" :style="{ transform: `translate3d(0, ${this.value ? 0 : 110}%, 0)` }">
      <div class="im-picker-box-header">
        <div @click="cancelBtn">取消</div>
        <div @click="confirmBtn">确定</div>
      </div>

      <div class="im-picker-box-content">

        <slot></slot>

        <div class="im-line-box"></div>

      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'im-picker',
  data () {
    return {
      resultData: []
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    cancelBtn () {
      this.$emit('cancelBtn')
    },
    clockLayer () {
      this.$emit('input', false)
    },
    confirmBtn () {
      this.$emit('confirmBtn', this.resultData)
    },
    updateValue () {
      this.resultData = []
      this.childrens = this.$children.filter(item => item.$options.name === 'im-picker-item')
      for (let i = 0; i < this.childrens.length; i++) {
        this.resultData.push(this.childrens[i].resultItem)
      }
    }
  },
  mounted () {
    this.updateValue()
  },
  computed: {
    showLayer () {
      return this.value
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../../less/base.less';
.@{prefixClass} {
  &-picker {
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    .layer {
      .mask();
    }
    &-box {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      background-color: #fff;
      font-size: .3px * @baseRem;
      transition: all .3s;
      z-index: 1501;
      &-content {
        display: flex;
        /*height: 400px;*/
        height: 4.8px * @baseRem;
        overflow: hidden;
        justify-content: space-around;
        position: relative;
        &-item {
          z-index: 10;
          transition: all .18s;
          max-width: calc(100% / 3);
          min-width: calc(100% / 3);
          &-value {
            .text-overflow();
            text-align: center;
            height: .8px * @baseRem;
            line-height: .8px * @baseRem;
            display: block;
          }
        }
      }
      &-header {
        display: flex;
        height: .8px * @baseRem;
        background-color: @base-color;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 40px;
        font-size: .37px * @baseRem;
        div {
          color: #FFF;
          font-size: .27px * @baseRem;
        }
      }
    }
  }
}
.im-line-box {
  position: absolute;
  width: 100%;
  height: .8px * @baseRem;
  top: 1.6px * @baseRem;
  border-color: #e8e8e8;
  border-style: solid;
  border-width: 1px;
  border-left: none;
  border-right: none;
  z-index: 9;
}
</style>
