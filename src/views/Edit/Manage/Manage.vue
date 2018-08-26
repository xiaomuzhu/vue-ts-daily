<template>
    <div class="times">
        <!-- 时段列表 -->
        <section>
            <van-swipe-cell v-for="item in times" :key="item.id" :right-width="65" :left-width="65">
                <aside @click="edit(item.id, item.title)" slot="left">编辑</aside>
                <van-cell-group>
                    <van-cell :value="item.title">
                        <template slot="title">
                            <icon name="time" />
                            <span slot="title">{{item.title}}</span>
                        </template>
                    </van-cell>
                </van-cell-group>
            <aside class="delete" slot="right">删除</aside>
        </van-swipe-cell>
    </section>
    <ClockPopup @hide="handleHide" :show="show" @save="handleHide"></ClockPopup>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { SwipeCell, Cell, CellGroup } from 'vant';

import config from '@/config';
import ClockPopup from '@/components/common/ClockPopup/ClockPopup.vue';

@Component({
  components: {
    [SwipeCell.name]: SwipeCell,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    ClockPopup,
  },
})
export default class Manage extends Vue {
  private times!: any[];
  private radio!: string;
  private show!: boolean;
  public data() {
    return {
      times: (config as any).defaultTimes,
      show: false,
    };
  }
  public edit(id: number, title: string) {
    this.show = true;
    //   this.message = value;
  }

  public handleHide() {
    this.show = false;
  }
}
</script>

<style src="./style.scss" lang="scss" scoped>
</style>
