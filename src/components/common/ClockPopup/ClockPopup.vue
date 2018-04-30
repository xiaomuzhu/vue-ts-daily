<template>
    <van-popup v-model="show" @click-overlay="handleHide" :close-on-click-overlay="false">
        <div class="clock">
            <p>打卡日志</p>
            <icon name="target" />
            <div>
                <van-field v-model="message" type="textarea" rows="5" placeholder="写出你想说的话..." />
                <van-button @click="save(message)" class="button" size="small">保存</van-button>
            </div>
        </div>
    </van-popup>
</template>

<script lang="ts">
import { Component, Vue, Watch, Emit, Prop } from 'vue-property-decorator';
import { Field, Popup, Button } from 'vant';

@Component({
  components: {
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Button.name]: Button,
  },
})
export default class ClockPopup extends Vue {
  @Prop() private name?: string;
  @Prop() private show?: boolean;
  private message?: string;

  public data() {
    return {
      message: '',
    };
  }
  @Emit('save')
  private save(messages?: string) {
    this.message = '';
  }

  @Watch('show')
  private changeShow(val: boolean, oldVal: boolean) {
    this.show = val;
  }

  @Emit('hide')
  private handleHide() {}
}
</script>

<style src="./style.scss" lang="scss" scoped>
</style>
