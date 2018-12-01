<template>
  <div class="today">
        <section>
      <van-collapse v-for="(item, index) in dayComputed.habits" :key="item.id" @change="change" v-model="today.active">
        <van-collapse-item :name="index">
          <p slot="title">
            <icon name="time" />{{item.title}}</p>
          <aside v-for="ele in item.habits" :key="ele.id" @click="finish(ele.id)">
            <Circles radius="3.5rem" v-if="!!ele.habitLog.date.find(item =>(item.id === days))" :activeColor="!!ele.habitLog.date.find(item =>(item.id === days)).isFinished ? ele.color : '#fff'">
              <icon :name="ele.iconName" slot="icon" />
            </Circles>
          </aside>
        </van-collapse-item>
      </van-collapse>
    </section>
    <ClockPopup :show="show" @save="saveLogs" @hide="hide" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Collapse, CollapseItem } from 'vant';
import { Mutation, State } from 'vuex-class';

import { HabitList as HabitListState, TimeSlotList } from '@/store/state';
import _ from '@/utils';

import Circles from '@/components/common/Circle/Circle.vue';
import ClockPopup from '@/components/common/ClockPopup/ClockPopup.vue';

export interface NewList {
  habits: HabitListState[] | never[];
  title?: string;
  id?: number;
}

@Component({
  components: {
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    Circles,
    ClockPopup,
  },
})
export default class Today extends Vue {
  @Mutation private createHabit!: (habit: HabitListState) => void;
  @Mutation
  private changeFinished!: (payload: { id: number; daysId: number }) => void;
  @Mutation private changeCollapse!: (habit: number[] | never[]) => void;
  @Mutation private updateHabits!: (updateList: number[]) => void;
  @Mutation
  private saveLog!: (
    payload: { id: number; daysId: number; message: string },
  ) => void;
  @State private habitList!: HabitListState[];
  @State private today!: object;
  private show!: boolean;
  private currentId!: number;
  private isDone!: boolean;
  // 今天距离1970年1.1的天数
  private days!: number;

  private data() {
    return {
      show: false,
      currentId: 0,
      days: _.getDaysId(),
      isDone: false,
    };
  }

  private mounted() {
    const { needUpdate } = this.dayComputed;
    const len = needUpdate.length;
    if (len) {
      this.updateHabits(needUpdate);
    }
    this.isDone = true;
  }

  private get dayComputed() {
    const habitsList = this.habitList.filter((item) => item.isActive === true);
    // 今天可用的习惯
    const current = _.dateComparison(habitsList);

    // 检测这些习惯是否产生了当日的任务,如果没有,批量创建
    const needUpdate = [];
    const timeList = new Set();
    for (let index = 0; index < current.length; index++) {
      const element = current[index]; // 单个习惯
      const { timeSlotList, activeTimes } = element.habitInfo;
      const { date } = element.habitLog;

      const len = date.length;
      // 当习惯的历史任务数组里是空那么放入待更新数组,如果最近的历史任务与今日的数字不匹配,说明没有创建今日任务,也放入更新
      if (len === 0) {
        needUpdate.push(element.id);
      } else if (date[len - 1].id !== this.days) {
        needUpdate.push(element.id);
      }
      // @ts-ignore
      const time = timeSlotList.find((e) => e.id === activeTimes);
      // time.habits.push(element);
      timeList.add(time!.title);
    }
    // 今天生效的时间段
    const list = Array.from(timeList);
    // 每一个时间段对应相应的习惯所组成的数组
    const currentList = [];
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      const newList: NewList = {
        habits: [],
      };
      for (let i = 0; i < current.length; ++i) {
        const item = current[i];
        const { timeSlotList, activeTimes } = item.habitInfo;

        const time = (timeSlotList as TimeSlotList[]).find(
          (e: TimeSlotList) => e.id === activeTimes,
        );
        if (time!.title === element) {
          if (newList.title === time!.title) {
            // @ts-ignore
            newList.habits.push(item);
          } else {
            newList.title = element;
            newList.id = index;
            // @ts-ignore
            newList.habits.push(item);
            currentList.push(newList);
          }
        }
      }
    }

    return {
      current,
      list,
      habits: currentList,
      needUpdate,
    };
  }

  private change(activeNames: number[] | never[]) {
    this.changeCollapse(activeNames);
  }
  private finish(id: number) {
    this.currentId = id;
    // 如果已经完成那么则是取消操作,否则是标记完成的操作
    if (
      this.habitList
        .find((item) => item.id === id)!
        .habitLog.date.find((item) => item.id === this.days)!.isFinished
    ) {
      // TODO/bug 将Finished重新设置为false时不触发视图更新
      // this.changeFinished({
      //   id,
      //   daysId: this.days,
      // });
    } else {
      this.show = true;
      this.changeFinished({
        id,
        daysId: this.days,
      });
    }
  }
  private saveLogs(message: string) {
    const id = _.getDaysId();
    this.saveLog({ id: this.currentId, daysId: id, message });
    this.show = false;
  }

  private hide() {
    this.show = false;
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.today {
  height: calc(100vh - 7rem);
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  overflow: auto;
  .van-collapse-item {
    margin-bottom: 1rem;
    p {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      @include font(1rem);
      svg {
        width: 1.2rem;
        height: 1.2rem;
        margin-right: 0.5rem;
      }
    }
    aside {
      min-height: 5rem;
      display: inline-flex;
      margin: 0 1rem;
      div {
        border: solid 1px black;
        border-radius: 50%;
        width: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        box-shadow: 0 0 3px 3px rgba(130, 130, 130, 0.3);
        svg {
          width: 3rem;
          height: 3rem;
        }
      }
    }
  }
}
</style>
