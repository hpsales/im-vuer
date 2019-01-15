webpackJsonp([7],{4289:function(o,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={name:"m-dialog",data:function(){return{flag:!1}},mounted:function(){},mixins:[{methods:{setFlag:function(){var o=this;this.flag=!0,setTimeout(function(){o.flag=!1},1800)}}}],methods:{openConfirm1:function(o){this.$confirm({title:"自定义标题",content:"总要在雨天逃避某段从前，但雨点偏偏促使这样遇见",styleFor:o,opts:[{txt:"取消",color:"#f00",cb:function(){console.log(1)}},{txt:"确定",color:"#00bFFF",cb:function(){console.log(2)}}],complete:function(){console.log("complete")}})},openConfirm2:function(o){this.$confirm({title:"自定义标题",content:"总要在雨天逃避某段从前，但雨点偏偏促使这样遇见",styleFor:o,opts:[{txt:"确定",color:"#f00",cb:function(){console.log(2)}}]})},openConfirm3:function(o){this.$confirm({title:"自定义标题",content:"总要在雨天逃避某段从前，但雨点偏偏促使这样遇见",styleFor:o,opts:[{txt:"取消",color:"#5d5d5d",cb:function(){console.log(1)}},{txt:"确定",color:"#00bFFF",cb:function(){console.log(2)}}]})},openConfirm4:function(o){this.$confirm({styleFor:o})},openToast1:function(o){this.flag||(this.setFlag(),this.$toast({content:"登录成功",position:o,time:1500}))},openActionSheet1:function(o){this.$actionSheet({styleFor:o,opts:[{txt:"回复",cb:function(){console.log(1)}},{txt:"转发",color:"#f00",cb:function(){console.log(2)}},{txt:"打印",color:"#009688",cb:function(){console.log(3)}},{txt:"评论",color:"#673ab7",cb:function(){console.log(4)}}],hasCancel:!0,complete:function(){console.log("actionSheet complete")}})},openActionSheet2:function(o){this.$actionSheet({styleFor:o,opts:[{txt:"拍照",cb:function(){console.log(1)}},{txt:"从本地选择",color:"#f00",cb:function(){console.log(2)}}],hasCancel:!0})},openActionSheet3:function(o){this.$actionSheet({styleFor:o,opts:[{txt:"默认是没有取消按钮",cb:function(){console.log(1)}},{txt:"我是红色",color:"#f00",cb:function(){console.log(2)}}]})},openTip1:function(o){this.flag||(this.setFlag(),this.$tip({txt:o,icon:o,time:1800}))},openTip2:function(){this.flag||(this.setFlag(),this.$tip({txt:"自定义",time:1800,tpl:'\n        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 140 64" fill="#fff">\n          <path \n          d="M67.408 57.834l-23.01-24.98c-5.864-6.15-5.864-16.108 0-22.248 5.86-6.14 15.37-6.14 21.234 0L70 16.168l4.368-5.562c5.863-6.14 15.375-6.14 21.235 0 5.863 6.14 5.863 16.098 0 22.247l-23.007 24.98c-1.43 1.556-3.757 1.556-5.188 0z">\n            <animate attributeName="fill" \n            begin="0" \n            dur="2s" \n            values="red;yellow;#00bfff;#FFF;pink;" \n            calcMode="linear" \n            repeatCount="indefinite"/>\n          </path>\n        </svg>'}))}}},c={render:function(){var o=this,t=o.$createElement,n=o._self._c||t;return n("div",{staticClass:"dialog-button"},[n("h5",[o._v("Confirm for ios ↓")]),o._v(" "),n("button",{on:{click:function(t){o.openConfirm1("ios")}}},[o._v("ios style 1")]),o._v(" "),n("button",{on:{click:function(t){o.openConfirm2("ios")}}},[o._v("ios style 2")]),o._v(" "),n("button",{on:{click:function(t){o.openConfirm3("ios")}}},[o._v("ios style 3")]),o._v(" "),n("button",{on:{click:function(t){o.openConfirm4("ios")}}},[o._v("ios style 4")]),o._v(" "),n("h5",[o._v("Confirm for android ↓")]),o._v(" "),n("button",{on:{click:function(t){o.openConfirm1("android")}}},[o._v("android style 1")]),o._v(" "),n("button",{on:{click:function(t){o.openConfirm2("android")}}},[o._v("android style 2")]),o._v(" "),n("button",{on:{click:function(t){o.openConfirm3("android")}}},[o._v("android style 3")]),o._v(" "),n("button",{on:{click:function(t){o.openConfirm4("android")}}},[o._v("android style 4")]),o._v(" "),n("h5",[o._v("Toast ↓")]),o._v(" "),n("button",{on:{click:function(t){o.openToast1("top")}}},[o._v("toast top")]),o._v(" "),n("button",{on:{click:function(t){o.openToast1("center")}}},[o._v("toast center")]),o._v(" "),n("button",{on:{click:function(t){o.openToast1("bottom")}}},[o._v("toast bottom")]),o._v(" "),n("h5",[o._v("ActionSheet for ios ↓")]),o._v(" "),n("button",{on:{click:function(t){o.openActionSheet1("ios")}}},[o._v("ActionSheet of multiple")]),o._v(" "),n("button",{on:{click:function(t){o.openActionSheet2("ios")}}},[o._v("ActionSheet of with cancel")]),o._v(" "),n("button",{on:{click:function(t){o.openActionSheet3("ios")}}},[o._v("ActionSheet of default")]),o._v(" "),n("h5",[o._v("ActionSheet for android ↓")]),o._v(" "),n("button",{on:{click:function(t){o.openActionSheet1("android")}}},[o._v("ActionSheet of multiple")]),o._v(" "),n("button",{on:{click:function(t){o.openActionSheet2("android")}}},[o._v("ActionSheet of with cancel")]),o._v(" "),n("button",{on:{click:function(t){o.openActionSheet3("android")}}},[o._v("ActionSheet of default")]),o._v(" "),n("h5",[o._v("Tip ↓")]),o._v(" "),n("button",{on:{click:function(t){o.openTip1("loading")}}},[o._v("Tip of default")]),o._v(" "),n("button",{on:{click:function(t){o.openTip1("success")}}},[o._v("Tip of success")]),o._v(" "),n("button",{on:{click:function(t){o.openTip1("warn")}}},[o._v("Tip of warn")]),o._v(" "),n("button",{on:{click:function(t){o.openTip1("error")}}},[o._v("Tip of error")]),o._v(" "),n("button",{on:{click:function(t){o.openTip2()}}},[o._v("Tip of user template")])])},staticRenderFns:[]};var e=n("C7Lr")(i,c,!1,function(o){n("q4HG")},"data-v-7d8d5e06",null);t.default=e.exports},q4HG:function(o,t){}});