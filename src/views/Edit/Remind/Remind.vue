<template>
  <div class="remind">
    <!-- 说明文字 -->
    <section class="panel">
      <p>您打算在那个时间设置提醒呢?</p>
    </section>
    <!-- 删除按钮 -->
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
import { SwitchCell, Cell, CellGroup } from 'vant';
import { State, Mutation } from 'vuex-class';

import { HabitList as HabitListState } from '@/store/state';
import config from '@/config';


@Component({
  components: {
      [SwitchCell.name]: SwitchCell,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
  },
})
  export default class Calendar extends Vue {
    @State private habitList: HabitListState[];
    @Mutation private switchRemind: (habitId: number, id: number) => void;
    private id: number;
    private index: number;

    // 获取当前习惯的id
    private mounted() {
      const list = this.habitList;
      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        if (element.mode === 'creating' || element.mode === 'editing') {
        this.id = element.id;
        this.index = index;
        return;
        }
      }
      this.id = -1;
    }

    // 计算属性得到remind相关数据
    private get remindComputed() {
      const len = this.habitList.length;
      const habit = this.habitList[this.index];
      return habit.habitInfo.remind;
    }
    // 切换switch按钮的状态
    private change(id: number) {
      this.switchRemind(this.id, id);
    }

  }
</script>

<style src="./style.scss" lang="scss" scoped>

</style>
