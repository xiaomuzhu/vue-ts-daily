<template>
    <div class="popup">
        <van-popup v-model="show" :show="show" position="right">
            <van-nav-bar @click-left="onClickLeft">
                <icon name="left-arrow" slot="left" />
                <h3 v-if="!!title" slot="title">{{title}}</h3>
            </van-nav-bar>
            <main>
                <slot></slot>
            </main>
        </van-popup>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator';
import { Popup, NavBar, Toast } from 'vant';
@Component({
  components: {
    [Popup.name]: Popup,
    [NavBar.name]: NavBar,
  },
})
export default class PopupNav extends Vue {
  @Prop() private show!: boolean;
  @Prop() private title!: string;

  @Watch('show')
  private changeShow(val: boolean, oldVal: boolean) {
    this.show = val;
  }
  @Emit('hide')
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
