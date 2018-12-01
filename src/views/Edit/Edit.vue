<template>
    <div class="edit">
        <!-- 新建页面的导航 -->
        <van-nav-bar @click-left="onClickLeft" @click-right="onClickRight">
            <icon name="left-arrow" slot="left" />
            <h3 v-if="title" slot="title">{{title}}</h3>
            <icon :name="right" slot="right" />
        </van-nav-bar>
        <!-- 渲染各种新建项目 -->
        <router-view />
        <!-- 弹出设置时段的对话框 -->
        <van-popup v-model="timeSlotShow" :overlay="false">
            <van-field center v-model="value" label="时段名称" placeholder="请输入时段名称" icon="clear">
                <van-button @click="save" slot="button" size="small" type="primary">保存</van-button>
                <van-button @click="cancel" slot="button" size="small">取消</van-button>
            </van-field>
        </van-popup>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { NavBar, Popup, Field, Button, Toast, DatetimePicker } from 'vant';

import { Mutation } from 'vuex-class';

import utils from '@/utils';

@Component({
  components: {
    [NavBar.name]: NavBar,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [Button.name]: Button,
    [DatetimePicker.name]: DatetimePicker,
  },
})
export default class Edit extends Vue {
  @Mutation
  private changeMode!: (payload: { id: number; value: string }) => void;
  private title?: string;
  private right?: string;
  private nextUrl?: string;
  private timeSlotShow?: boolean;
  private timeShow?: boolean;
  private value?: string;
  private count?: number;
  private data() {
    const { path, query } = this.$route;
    switch (query.mode ? `${path}?mode=${query.mode}` : path) {
      case '/edit':
        this.right = 'edit';
        this.nextUrl = '/edit/times/?mode=new';
        break;
      case '/edit/times/?mode=new':
        this.right = 'setting-edit';
        this.nextUrl = '/edit/manage/?mode=new';
        break;
      case '/edit/manage/?mode=new':
        this.right = 'new';
        break;
      case '/edit/remind/?mode=new':
        this.right = 'time';
        break;
      default:
        break;
    }

    return {
      value: '',
      timeSlotShow: false,
      timeShow: false,
      title: this.$route.name,
      right: this.right,
      currentDate: '12:00',
      count: 3,
    };
  }
  private onClickLeft() {
    if (this.$route.name === '编辑习惯') {
      const id: number = parseInt((this.$route.query.id) as string, 10);
      this.changeMode({ id, value: 'done' });
    }
    this.$router.go(-1);
  }

  private onClickRight() {
    // 如果存在下一个url,点击右侧图标跳转,否则弹出对话框
    if (this.nextUrl) {
      this.$router.push(this.nextUrl);
    } else {
      switch (this.right) {
        case 'new':
          this.timeSlotShow = true;
          break;
        case 'time':
          this.timeShow = true;
          break;
        default:
          break;
      }
    }
  }
  private cancel() {
    this.timeSlotShow = false;
    this.value = '';
  }
  private save() {
    if ((utils as any).getStr(this.value)) {
      this.timeSlotShow = false;
      this.value = '';
      this.$toast('创建成功');
    } else {
      this.$toast('只允许输入2-6位的汉字、字母、数字、下划线');
    }
  }
}
</script>

<style src="./style.scss" lang="scss" scoped>
</style>
