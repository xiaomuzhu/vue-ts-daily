<template>
  <div class="counter-warp">
    <p>PackageA</p>
    <p>ts value {{ ver }}</p>
    <card text="card component"></card>
    <a :href="AppUrls.COUNTER" class="home">去往vuex</a>
  </div>
</template>
<!--必须指定为ts-->
<script lang="ts" src="./index.ts">
</script>


<style>
  .counter-warp {
    text-align: center;
    margin-top: 100px;
  }

  .home {
    display: inline-block;
    margin: 100px auto;
    padding: 5px 10px;
    color: blue;
    border: 1px solid blue;
  }

</style>
