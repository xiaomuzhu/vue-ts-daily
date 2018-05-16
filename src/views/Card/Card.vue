<template>
    <div class="card">
        <!-- 新建页面的导航 -->
        <van-nav-bar @click-left="onClickLeft" @click-right="onClickRight">
            <icon name="left-arrow" slot="left" />
            <h3 v-if="title" slot="title">{{title}}</h3>
        </van-nav-bar>
        <!-- 渲染各种新建项目 -->
        <router-view />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { NavBar, Popup, Field, Button, Toast, DatetimePicker } from 'vant';

import utils from '@/utils';

@Component({
  components: {
    [NavBar.name]: NavBar,
    [Popup.name]: Popup,
  },
})
export default class CardPage extends Vue {
  private title?: string;
  private data() {
    return {
      title: this.$route.name,
    };
  }

  private onClickLeft() {
    this.$router.go(-1);
  }
}
</script>

<style src="./style.scss" lang="scss" scoped>
</style>
