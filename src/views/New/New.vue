<template>
  <div class="new">
    <!-- 新建页面的导航 -->
    <van-nav-bar @click-left="onClickLeft">
      <icon name="left-arrow" slot="left" />
      <h3 v-if="title" slot="title">{{title}}</h3>
    </van-nav-bar>
    <!-- 渲染各种新建项目 -->
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { NavBar, Toast } from 'vant';
import { HabitList as HabitListState } from '@/store/state';
import { Mutation } from 'vuex-class';

@Component({
  components: {
    [NavBar.name]: NavBar,
  },
})
export default class New extends Vue {
  private title?: string;
  @Mutation private RemoveHabit!: () => void;
  private data() {
    return {
      title: this.$route.name,
    };
  }

  private onClickLeft() {
    if (this.$route.name === '习惯') {
      this.RemoveHabit();
    }
    this.$router.go(-1);
  }
}
</script>

<style src="./style.scss" lang="scss" scoped>
</style>
