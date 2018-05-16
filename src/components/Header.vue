<template>
    <header>
                <aside v-if="!!headerInfo.left" @click="leftHandle" >
        <Icon :name="headerInfo.left"></Icon>
        </aside>
        
        <div v-else></div>
        <h3>{{headerInfo.title}}</h3>
        <aside v-if="!!headerInfo.right" @click="rightHandle">
        <Icon :name="headerInfo.right"></Icon>
        </aside>
        <div v-else></div>
        <Popup :show="show" @hide="hide" :title="habitLibrary" ></Popup>
    </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';

import { HeaderInfo, PageInfo } from '@/store/state';
import config from '@/config';
import Icon from './common/Icon/HeaderIcon';
import Popup from './common/Popup/Popup.vue';

@Component({
  components: {
    Icon,
    Popup,
  },
})
export default class Header extends Vue {
  @State private headerInfo!: HeaderInfo;

  private show!: boolean;
  private habitLibrary?: string = '';
  private navTitle: any;

  private data() {
    return {
      show: false,
      navTitle: (config as any).navTitle,
    };
  }

  // 针对不同的左侧按钮触发不同操作
  private leftHandle() {
    const { left } = this.headerInfo;

    switch (left) {
      case 'file':
        this.$router.push({ path: '/edit/recycle' });
        break;
      case 'letter':
        this.$router.push({ path: '/card/receive' });
      default:
        break;
    }
  }
  // 针对不同的右侧按钮触发不同操作
  private rightHandle() {
    const right = this.headerInfo.right;

    switch (right) {
      case 'new':
        this.newHabit();
        break;
      // case 'file':
      // this.newHabit();
      // break;

      default:
        break;
    }
  }

  private newHabit() {
    this.$router.push({ path: '/new/library' });
    // this.show = true;
    // this.habitLibrary = this.navTitle.habit.habitLibrary;
  }

  private hide() {
    this.show = false;
  }
}
</script>

<style lang="scss" scoped>
header {
  display: grid;
  grid-template-columns: 3rem auto 3rem;
  align-items: center;
  grid-row-end: end;
  width: 100%;
  height: 3.5rem;
  min-height: 8%;
  background-color: #fff;
}

.van-popup {
  width: 100%;
  height: 100%;
}
</style>
