<template>
    <div class="feedback">
        <!-- 导航 -->
        <section>
            <van-nav-bar @click-left="onClickLeft">
                <icon name="left-arrow" slot="left" />
                <h3 v-if="title" slot="title">{{title}}</h3>
            </van-nav-bar>
        </section>
        <!-- 输入框 -->
        <section>
            <p>留言板</p>
            <van-field v-model="message" type="textarea" placeholder="请输入留言" rows="4" autosize />
        </section>
        <!-- 确认发送 -->
        <section>
            <van-button :loading="loading" @click="send" size="small" >发送</van-button>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Field, Button, NavBar } from 'vant';
import { State, Mutation } from 'vuex-class';
import { SettingState, UserState } from '@/store/state';

@Component({
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [NavBar.name]: NavBar,
  },
})
    export default class Feedback extends Vue {
        // @State private setting: SettingState;
        // @State private user: UserState;
        // @Mutation private changeHourly: (checked: boolean) => void;
        private message?: string;
        private title: string;
        private loading: boolean;
        public data() {
            return {
                message: '',
                title: this.$route.name,
                loading: false,
            }
        }
        private onClickLeft() {
            this.$router.go(-1);
        }
        private send() {

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
