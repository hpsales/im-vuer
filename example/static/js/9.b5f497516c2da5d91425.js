webpackJsonp([9],{OT3l:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"demo-swiper-box"},[n("im-tab",{attrs:{lineThickness:"5px",activeCurrIndex:e.activeCurrIndex,list:e.list},on:{"on-tab":e.tabClick}}),e._v(" "),n("im-swiper",{attrs:{isTabView:!0,idx:e.activeCurrIndex,autoPlay:0,loop:!1,dotColor:"transparent",dotActiveColor:"transparent"},on:{"on-swiper":e.onSwiper}},e._l(e.list.length,function(t,i){return n("im-swiper-item",{key:i},[n("div",{staticClass:"swiper-box"},[e._v("这是tab组件和swiper组件一起使用的"+e._s(t))])])}))],1)},staticRenderFns:[]};var r=n("C7Lr")({name:"swiper-box",data:function(){return{list:[{name:"电影"},{name:"电视剧"},{name:"音乐"},{name:"动漫"}],activeCurrIndex:1}},methods:{onSwiper:function(e){this.activeCurrIndex+=e},tabClick:function(e){this.activeCurrIndex=e}}},i,!1,function(e){n("X8EX")},"data-v-748516b4",null);t.default=r.exports},X8EX:function(e,t){}});