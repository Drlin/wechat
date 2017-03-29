<template>
  <i :class="`icon-${type}`"></i>
</template>

<script>
export default {
  props: ['type']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@font-face {
  font-family: 'icon';
  src:  url('/static/fonts/icomoon.eot?dyaqqk');
  src:  url('/static/fonts/icomoon.eot?dyaqqk#iefix') format('embedded-opentype'),
        url('/static/fonts/icomoon.ttf?dyaqqk') format('truetype'),
        url('/static/fonts/icomoon.woff?dyaqqk') format('woff'),
        url('/static/fonts/icomoon.svg?dyaqqk#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
}

[class^="icon-"], [class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'icon' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/*-angle- 代表 > 类无背景图标， -circle-表示黑色背景图标 -arrow-表示箭头*/

.icon-user:before {
    content: "\e900";
}
.icon-circle-ok:before {
    content: "\e901";
}
.icon-circle-right:before {
    content: "\e902";
}
.icon-back:before {
    content: "\e903";
}
.icon-dollar:before {
    content: "\e904";
}
.icon-right:before {
    content: "\e905";
}
.icon-time:before {
    content: "\e906";
}
.icon-angle-close:before {
    content: "\e907";
}
.icon-arrow-right:before {
    content: "\e908";
}
.icon-up-down:before {
    content: "\e909";
}
.icon-down:before {
    content: "\e90a";
}
.icon-next:before {
    content: "\e90b";
}
.icon-smile:before {
    content: "\e90c";
}
.icon-neutral:before {
    content: "\e90d";
}
.icon-sad:before {
    content: "\e90e";
}
.icon-right-left:before {
    content: "\e90f";
}
.icon-phone:before {
    content: "\e910";
}
.icon-key:before {
    content: "\e911";
}
.icon-on:before {
    content: "\e912";
}
.icon-qq:before {
    content: "\e913";
}
.icon-english:before {
    content: "\e914";
}
.icon-number:before {
    content: "\e915";
}
.icon-pencil:before {
    content: "\e916";
}
.icon-close:before {
    content: "\e917";
}
.icon-circle-user:before {
    content: "\e918";
}
.icon-exclamation:before {
    content: "\e919";
}
.icon-ciecle-right:before {
    content: "\e91a";
}
.icon-download:before {
    content: "\e91b";
}
.icon-angle-down:before {
    content: "\e91c";
}
.icon-yen:before {
    content: "\e91d";
}
.icon-angle-ok:before {
    content: "\e91e";
}
.icon-volume:before {
    content: "\e91f";
}
.icon-roundrect:before {
    content: "\e920";
}
.icon-ok:before {
    content: "\e921";
}
.icon-wrong:before {
    content: "\e922";
}
.icon-correct:before {
    content: "\e923";
}
.icon-defeat:before {
    content: "\e924";
}
.icon-call:before {
    content: "\e925";
}
.icon-prev:before {
    content: "\e926";
}
.icon-school:before {
    content: "\e927";
}
.icon-ciecle-prev:before {
    content: "\e928";
}
.icon-delete:before {
    content: "\e929";
}
.icon-ciecle-next:before {
    content: "\e92a";
}
.icon-sm-wrong:before {
    content: "\e92b";
}
.icon-course-math:before {
    content: "\e92c";
}
.icon-course-english:before {
    content: "\e92d";
}
.icon-wait:before {
    content: "\e92e";
}
.icon-orz:before {
    content: "\e92f";
}
.icon-rocket:before {
    content: "\e930";
}
.icon-mug:before {
    content: "\e931";
}
.icon-angle-rocket:before {
    content: "\e932";
}
.icon-angle-mug:before {
    content: "\e933";
}
.icon-box-down:before {
    content: "\e934";
}
.icon-foot-qq:before {
  content: "\e935";
}
.icon-course-biology:before {
  content: "\e936";
}
.icon-course-chemistry:before {
  content: "\e937";
}
.icon-course-exp:before {
  content: "\e938";
}
.icon-course-geography:before {
  content: "\e939";
}
.icon-course-history:before {
  content: "\e93a";
}
.icon-course-language:before {
  content: "\e93b";
}
.icon-course-physics:before {
  content: "\e93c";
}
.icon-course-politics:before {
  content: "\e93d";
}
.icon-search:before {
  content: "\e986";
}
.icon-heart:before {
  content: "\e9da";
}
</style>
