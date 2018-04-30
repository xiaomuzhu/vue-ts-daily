<template>
  <div class="error">
      <router-link class="redirect" to="/">回到首页</router-link>
  </div>
</template>
<style lang="scss" scoped>
@import '../../style/mixin';

.error {
  width: 100vw;
  height: 100vh;
  @include bis('../../assets/404.jpg');
  .redirect {
    display: block;
    position: relative;
    top: 70%;
    color: antiquewhite;
  }
}
</style>
