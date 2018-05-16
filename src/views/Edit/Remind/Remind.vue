<template>
  <div class="remind">
    <!-- 说明文字 -->
    <section class="panel">
      <p>您打算在那个时间设置提醒呢?</p>
    </section>
    <!-- 提醒列表 -->
    <section class="list">
      <van-cell-group v-if="!!remindComputed.length">
        <van-cell v-for="item in remindComputed" :key="item.id">
          <van-switch-cell :title="item.remind" v-model="item.isOpen" @change="change" />
        </van-cell>
      </van-cell-group>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { SwitchCell, Cell, CellGroup, Toast } from 'vant';
import { State, Mutation } from 'vuex-class';

import { HabitList as HabitListState } from '@/store/state';
import config from '@/config';
import { Payload } from '_vuex@3.0.1@vuex';

@Component({
  components: {
    [SwitchCell.name]: SwitchCell,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
})
export default class Remind extends Vue {
  @State private habitList!: HabitListState[];
  @Mutation
  private switchRemind!: (payload: { habitId: number; id: number }) => void;
  private id!: number;

  // 获取当前习惯的id
  private mounted() {
    const list = this.habitList;
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      // 如果在编辑或者在新建那一定是当前习惯了
      if (element.mode === 'creating' || element.mode === 'editing') {
        this.id = element.id;
        return;
      }
    }
    this.id = -1;
  }

  // 计算属性得到remind相关数据
  private get remindComputed() {
    const len = this.habitList.length;
    const habit = this.habitList[len - 1];

    return habit.habitInfo.remind;
  }
  // 切换switch按钮的状态
  private change(id: number) {
    if (this.id < 0) {
      Toast({
        type: 'fail',
        message: '可能出错了',
      });
    } else {
      this.switchRemind({ habitId: this.id, id });
    }
  }
}
</script>

<style src="./style.scss" lang="scss" scoped>
</style>
