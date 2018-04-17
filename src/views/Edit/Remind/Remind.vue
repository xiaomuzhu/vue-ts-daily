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
    @Mutation private switchRemind: (id: number) => void

    private get remindComputed() {
      const len = this.habitList.length;
      const habit = this.habitList[len - 1];
      return habit.habitInfo.remind;
    }

    private change(id: number) {
      this.switchRemind(id);
    }

  }
</script>

<style src="./style.scss" lang="scss" scoped>

</style>
