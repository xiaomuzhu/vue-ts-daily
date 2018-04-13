<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <van-progress :percentage="46" />
    <van-steps>
  <van-step>买家下单</van-step>
  <van-step>商家接单</van-step>
  <van-step>买家提货</van-step>
  <van-step>交易完成</van-step>
</van-steps>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Progress, Step, Steps } from 'vant';

@Component({
        components: {
            [Progress.name]: Progress,
            [Step.name]: Step,
            [Steps.name]: Steps,
        },
    })
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
