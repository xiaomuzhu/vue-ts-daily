<template>
    <div class="edit">
        <!-- 新建页面的导航 -->
        <van-nav-bar @click-left="onClickLeft" @click-right="onClickRight">
            <icon name="left-arrow" slot="left" />
            <h3 v-if="title" slot="title">{{title}}</h3>
            <icon :name="right" slot="right"/>
        </van-nav-bar>
        <!-- 渲染各种新建项目 -->
        <router-view />
        <van-popup v-model="show" position="right" :overlay="false">
        <input v-model="value" placeholder="输入名称" />
        <van-button size="small">保存</van-button>
        </van-popup>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { NavBar, Popup, Field, Button } from 'vant';

@Component({
  components: {
      [NavBar.name]: NavBar,
      [Popup.name]: Popup,
      [Field.name]: Field,
      [Button.name]: Button,
  },
})
    export default class New extends Vue {
        private title ?: string;
        private right ?: string;
        private nextUrl ?: string;
        private show ?: boolean;
        private value ?: string;
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
                    this.right = 'new'
                    break;
                default:
                    break;
            }
            console.log(this.nextUrl);
            return {

                show: false,
                title: this.$route.name,
                right: this.right,
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
                this.show = true;
            }
        }
    }
</script>

<style src="./style.scss" lang="scss" scoped>

</style>
