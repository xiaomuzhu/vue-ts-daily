<template>
  <div class="times">
    <!-- 说明文字 -->
    <section class="panel">
        <p>大致在一天中哪个时间段执行这个习惯呢?</p>
    </section>
    <!-- 删除按钮 -->
    <section class="list">
        <van-radio-group v-model='radio' @change="change">
            <van-cell-group>
                <van-cell v-for="item in timesComputed.timeSlotList" :key="item.id">
                    <van-radio :name="item.id">{{item.title}}</van-radio>
                </van-cell>
            </van-cell-group>
        </van-radio-group>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Radio, Cell, CellGroup, RadioGroup } from 'vant';
import { State, Mutation } from 'vuex-class';

import { HabitList as HabitListState } from '@/store/state';

@Component({
  components: {
    [Radio.name]: Radio,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [RadioGroup.name]: RadioGroup,
  },
})
export default class Calendar extends Vue {
  @State private habitList!: HabitListState[];
  @Mutation
  private changeTimes!: (payload: { habitId: number; id: number }) => void;
  private radio!: number;
  private id!: number;
  private index!: number;
  public data() {
    return {
      radio: -1,
    };
  }

  // 加载完毕后将radio重新赋值
  public mounted() {
    this.radio = this.timesComputed.radio;

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

  // 计算当前时间段的状态
  private get timesComputed() {
    const len = this.habitList.length;
    const habit = this.habitList[len - 1];
    const activeTimes = habit.habitInfo;
    return {
      timeSlotList: habit.habitInfo!.timeSlotList,
      radio: habit.habitInfo.activeTimes,
    };
  }

  // 选择时段后触发vuex进行变动
  private change(id: number) {
    this.changeTimes({ habitId: this.id, id });
  }
}
</script>

<style src="./style.scss" lang="scss" scoped>
</style>
