<template>
    <div class="popup">
        <van-popup v-model="show" :show="show" position="right">
            <van-nav-bar title="标题" left-text="返回" right-text="按钮" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
        </van-popup>
    </div>
</template>

<script lang="ts">
    import {
        Component,
        Prop,
        Vue,
        Emit,
    } from 'vue-property-decorator';
    import {
        Popup,
        NavBar,
    } from 'vant';
    @Component({
        components: {
            [Popup.name]: Popup,
            [NavBar.name]: NavBar,
        },
    })
    export default class PopupNav extends Vue {
        @Prop()
        private show!: boolean;
        @Prop()
        private path!: string;
        private data() {
            return {
                show: true,
            }
        }
        public mounted() {
            console.log(this);

        }
        // @Emit('handleShow')
        // private handleShow() {
        //     this.show = true;
        // }
        // @Watch('show')
        // private changeShow(val: boolean, oldVal: boolean) {
        //     console.log(val);

        //     this.show = val
        // }
        private onClickLeft() {
            Toast('返回');
        }
        private onClickRight() {
            Toast('按钮');
        }
    }
</script>

<style src="./style.scss" lang="scss" scoped>

</style>

