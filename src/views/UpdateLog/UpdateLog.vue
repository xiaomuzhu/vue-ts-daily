<template>
    <div class="log">
        <!-- 导航 -->
        <section>
            <van-nav-bar @click-left="onClickLeft">
                <icon name="left-arrow" slot="left" />
                <h3 v-if="title" slot="title">{{title}}</h3>
            </van-nav-bar>
        </section>
        <!-- 日志 -->
        <section>
        <ul>
            <li>0.0.1: 初版,目前已完成90%的功能,即将可以正常使用.</li>
            <li></li>
        </ul>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { NavBar } from 'vant';

@Component({
  components: {
    [NavBar.name]: NavBar,
  },
})
export default class UpdateLog extends Vue {
  private message?: string;
  private title!: string;
  private loading!: boolean;
  public data() {
    return {
      message: '',
      title: this.$route.name,
      loading: false,
    };
  }
  private onClickLeft() {
    this.$router.go(-1);
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.van-nav-bar {
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    @include iconSize(1.4rem);
  }
}
</style>
