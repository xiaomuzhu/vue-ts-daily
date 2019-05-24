<template>
  <div class="counter-warp">
    <p>Mpvue</p>
    <p>ts value {{ ver }}</p>
    <card text="card component"></card>
    <comp-b text="hello2"></comp-b>
    <comp-alias text="hello3"></comp-alias>
    <a :href="AppUrls.COUNTER" class="home">去往vuex</a>
    <a :href="AppUrls.PACKAGE_A" class="home">分包A</a>
    <a href="/pages/testExtend/main" class="home">测试继承</a>
  </div>
</template>
<!--必须指定为ts-->
<script lang="ts" src="./index.ts">
</script>


<style lang="less">
  @import "./index";

  .counter-warp {
    text-align: center;
    margin-top: 100px;
  }

  .home {
    display: block;
    margin: 10px auto;
    padding: 5px 10px;
    color: blue;
    border: 1px solid blue;
  }

</style>
