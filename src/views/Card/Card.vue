<template>
    <div class="card">
        <!-- 新建页面的导航 -->
        <van-nav-bar @click-left="onClickLeft" @click-right="onClickRight">
            <icon name="left-arrow" slot="left" />
            <h3 v-if="title" slot="title">{{title}}</h3>
            <!-- <icon :name="right" slot="right" /> -->
        </van-nav-bar>
        <!-- 渲染各种新建项目 -->
        <router-view />
        <!-- 弹出设置时段的对话框 -->
        <!-- <van-popup v-model="timeSlotShow" :overlay="false">
            <van-field center v-model="value" label="时段名称" placeholder="请输入时段名称" icon="clear">
                <van-button @click="save" slot="button" size="small" type="primary">保存</van-button>
                <van-button @click="cancel" slot="button" size="small">取消</van-button>
            </van-field>
        </van-popup> -->
        <!-- 弹出设置提醒的对话框 -->
        <!-- <van-popup class="time" v-model="timeShow" position="bottom" :overlay="true">
            <van-datetime-picker v-model="currentDate" type="time" @confirm="setTime" :visible-item-count="count" title="选择提醒时间" />
        </van-popup> -->
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
        private title ?: string;
        private right ?: string;
        private nextUrl ?: string;
        private timeSlotShow ?: boolean;
        private timeShow ?: boolean;
        private value ?: string;
        private count ?: number;

        private data() {
            return {
                title: this.$route.name,
            }
        }


        private onClickLeft() {
            this.$router.go(-1);
        }
        private onClickRight() {
            // 如果存在下一个url,点击右侧图标跳转,否则弹出对话框
            if (this.nextUrl) {
                this.$router.push(this.nextUrl)
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
    }
</script>

<style src="./style.scss" lang="scss" scoped>

</style>
