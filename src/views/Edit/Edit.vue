<template>
    <div class="new">
        <!-- 新建页面的导航 -->
        <van-nav-bar @click-left="onClickLeft">
            <icon name="left-arrow" slot="left" />
            <h3 v-if="title" slot="title">{{title}}</h3>
            <van-icon :name="right" />
        </van-nav-bar>
        <!-- 渲染各种新建项目 -->
        <router-view />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { NavBar, Icon } from 'vant';

@Component({
  components: {
      [NavBar.name]: NavBar,
      [Icon.name]: Icon,
  },
})
    export default class New extends Vue {
        private title ?: string;
        private right ?: string;
        private data() {
            const path = this.$route.path;
            switch (path) {
                case '/edit':
                    this.right = 'edit'
                    break;
                default:
                    break;
            }
            return {
                title: this.$route.name,
                right: this.right,
            }
        }
        private onClickLeft() {
            this.$router.go(-1);
        }
    }
</script>

<style src="./style.scss" lang="scss" scoped>

</style>
