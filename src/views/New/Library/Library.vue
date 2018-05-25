<template>
  <div class="habit">
    <!-- 新建说明 -->
    <section>
      <p>
        您可以从习惯库中挑选一个习惯,也可以新建一个新的习惯。
      </p>
    </section>
    <!-- 新建习惯 -->
    <section>
      <h4>自定义习惯</h4>
      <router-link :to="{path:'habit',query:{id: newHabit.id}}">
        <van-cell @click="create(newHabit.id)" :value="newHabit.title">
          <icon :name="newHabit.name" slot="icon" />
        </van-cell>
      </router-link>
    </section>
    <!-- 习惯库 -->
    <section>
      <h4>从库中挑选习惯</h4>
      <van-list>
          <van-cell v-for="item in habitLibrary" :key="item.id" @click="create(item.id)" :value="item.title">
            <icon :name="item.name" slot="icon" />
          </van-cell>
      </van-list>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { List, Cell } from 'vant';
import { Mutation } from 'vuex-class';
import moment from 'moment';

import config from '@/config';
import { HabitList as HabitListState } from '@/store/state';
@Component({
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
  },
})
export default class Library extends Vue {
  private title?: string;
  private habitLibrary!: object[];
  @Mutation private createHabit!: (habit: HabitListState) => void;
  private data() {
    return {
      title: this.$route.name,
      habitLibrary: (config as any).habitLibrary,
      newHabit: (config as any).newHabit,
    };
  }

  private create(id: number) {
    const timestamp = new Date().valueOf();
    const iconInfo =
      id === 0
        ? config.newHabit
        : config.habitLibrary.find(item => item.id === id);
    const habit = {
      id: timestamp,
      iconName: iconInfo!.name,
      color: '#ffe884',
      mode: 'creating',
      isActive: false,
      habitInfo: {
        // 习惯名称
        habitName: iconInfo!.title,
        // 重复练习的日期
        RepeatingDate: [
          { id: 0, date: '星期一', checked: true },
          { id: 1, date: '星期二', checked: true },
          { id: 2, date: '星期三', checked: true },
          { id: 3, date: '星期四', checked: true },
          { id: 4, date: '星期五', checked: true },
          { id: 5, date: '星期六', checked: true },
          { id: 6, date: '星期日', checked: true },
        ],
        // 练习的时间段
        activeTimes: 0,
        timeSlotList: [
          {
            id: 0,
            isActive: true,
            title: '起床之后',
          },
          {
            id: 1,
            isActive: false,
            title: '晨间习惯',
          },
          {
            id: 2,
            isActive: false,
            title: '中午时分',
          },
          {
            id: 3,
            isActive: false,
            title: '午间习惯',
          },
          {
            id: 4,
            isActive: false,
            title: '晚间习惯',
          },
          {
            id: 5,
            isActive: false,
            title: '睡觉之前',
          },
          {
            id: 6,
            isActive: false,
            title: '任意时间',
          },
        ],
        // 提醒的时间
        remind: [],
        // 激励自己的话
        inspire: '',
      },
      habitLog: {
        // 总共坚持练习了多少天
        totalHabitDays: 0,
        // 当前连续联系了多少天
        currentConsecutiveDays: 0,
        // 历史上最多连续练习多少天
        mostConsecutiveDays: 0,
        // 创建日期
        createdTime: moment(timestamp).format('YYYY-MM-DD'),
        // 创建此习惯至今多少天
        totalDays: parseInt(moment(timestamp).fromNow(true)),
        // 坚持的日期
        date: [],
      },
    };
    this.createHabit(habit);
    this.$router.push(`/new/habit?id=${id}`);
  }
}
</script>

<style src="./style.scss" lang="scss" scoped>
</style>
