<template>
  <div class="edit">
    <!-- 日历 -->
    <section class="calendar">
      <vue-event-calendar :events="habitEventsComputed" @day-changed="handleDayChanged" @month-changed="handleMonthChanged"></vue-event-calendar>
    </section>
    <!-- 习惯记录面板 -->
    <section class="panel" v-if="currentHabit">
      <ul>
        <li><span><icon name="target"/>总共坚持的天数</span><span>{{habitLogComputed.totalHabitDays}}天</span></li>
        <li><span><icon name="up"/>当前连续天数</span><span>{{habitLogComputed.currentConsecutiveDays}}天</span></li>
        <li><span><icon name="record"/>最长连续记录</span><span>{{habitLogComputed.mostConsecutiveDays}}天</span></li>
        <li><span><icon name="create"/>建立时间</span><span>{{habitLogComputed.create}}</span></li>
        <li><span><icon name="total"/>总共加入天数</span><span>{{habitLogComputed.totalTodays}}天</span></li>
      </ul>
    </section>
    <ClockPopup :show="show" @save="saveLogs"></ClockPopup>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Field, Popup, Button } from 'vant';
import moment from 'moment';

import { Mutation, State } from 'vuex-class';
import { HabitList as HabitListState } from '@/store/state';

import DateBlock from '@/components/common/DateBlock/DateBlock.vue';
import ClockPopup from '@/components/common/ClockPopup/ClockPopup.vue';
import config from '@/config';
import _ from '@/utils';

@Component({
  components: {
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Button.name]: Button,
    DateBlock,
    ClockPopup,
  },
})
export default class Calendar extends Vue {
  private name?: string;
  private show?: boolean;
  private id!: number;
  private habitLibrary!: object[];
  private habitEvents!: any[];
  private currentHabit?: HabitListState;
  @State private habitList!: HabitListState[];
  @Mutation
  private saveLog!: (
    payload: {
      id: number;
      daysId: number;
      message: string;
    },
  ) => void;
  @Mutation
  private changeFinished!: (
    payload: {
      id: number;
      daysId: number;
    },
  ) => void;
  @Mutation
  private supplementHabits!: (
    payload: {
      id: number;
      daysId: number;
    },
  ) => void;
  private data() {
    const id: number = parseInt((this.$route.query.id) as string, 10);
    return {
      show: false,
      id,
      currentHabit: undefined,
    };
  }
  // 此习惯相关信息的计算值
  private get habitLogComputed() {
    this.currentHabit = _.find(this.habitList, this.id);
    const {
      totalHabitDays,
      mostConsecutiveDays,
      currentConsecutiveDays,
    } = this.currentHabit!.habitLog;
    const createdTime = this.currentHabit!.id;
    // 创建至今多少天
    const totalTodays = _.getDaysId() - _.getDaysId(createdTime) + 1;
    // 创建日期
    moment.locale('zh-cn');
    const create = moment(createdTime)
      .format('l')
      .replace(/\//g, '-');
    return {
      totalHabitDays,
      mostConsecutiveDays,
      currentConsecutiveDays,
      totalTodays,
      create,
    };
  }
  private get habitEventsComputed() {
    this.currentHabit = _.find(this.habitList, this.id);
    const { date } = this.currentHabit!.habitLog;
    const habitEvents = date.filter((item) => item.isFinished).map((ele) => {
      moment.locale('zh-cn');
      const date = moment(ele.time!)
        .format('L')
        .replace(/-/g, '/');
      return {
        date,
        title: ele.message,
      };
    });
    return habitEvents;
  }
  private saveLogs(message: string) {
    const id = _.getDaysId();
    this.saveLog({
      id: this.id,
      daysId: id,
      message,
    });
    this.show = false;
  }
  private handleDayChanged(data: any) {
    // 获取打卡记录
    const habit = _.find(this.habitList, this.id);
    const { date } = habit!.habitLog;

    // 将moment对象转化为时间戳用于获取id
    moment.locale('zh-cn');
    const time = moment(_.getNewDate(data.date), 'MM-DD-YYYY').valueOf();

    // 获取id
    const daysId = _.getDaysId(time);
    // 获取当前距离1970的天数
    const curId = _.getDaysId();

    if (curId < daysId) {
      return;
    }

    // 用获取到的id与date数组中的对象进行查找,如果发现有维护中的打卡记录则修改,若没有则创建
    let dateLog;
    for (let index = 0; index < date.length; index++) {
      const element = date[index];
      if (element.id === daysId) {
        dateLog = element;
      }
    }
    if (dateLog) {
      // 如果已经完成那么则是取消操作,否则是标记完成的操作
      if (habit!.habitLog.date.find((item) => item.id === daysId)!.isFinished) {
        this.changeFinished({
          id: this.id,
          daysId,
        });
      } else {
        this.show = true;
        this.changeFinished({
          id: this.id,
          daysId,
        });
      }
    } else {
      this.show = true;
      this.supplementHabits({
        id: this.id,
        daysId,
      });
    }
  }
  private handleMonthChanged(data: any) {
    console.log('month-changed', data);
  }
}
</script>

<style src="./style.scss" lang="scss" scoped>
</style>
