<template>
  <div class="habit" v-if="!!habitList[index]">
    <!-- 习惯图标 -->
    <section class="icon">
      <router-link v-if="!!colorComputed" :to="{path:'/edit/icon/',query:{mode}}">
        <div class="cir">
          <Circles radius="3.5rem" :activeColor="colorComputed">
            <icon :name="iconComputed" slot="icon" />
          </Circles>
        </div>
      </router-link>
    </section>
    <!-- 输入习惯名称 -->
    <section class="field">
      <van-field v-model="nameComputed" placeholder="请输入名称" />
    </section>
    <!-- 习惯设置 -->
    <section>
      <van-cell-group>
        <van-cell clickable is-link center @click="handleShow" title="习惯的重复" :value="dateComputed.value" />
        <router-link :to="{path:'/edit/times/',query:{mode: 'new'}}">
          <van-cell center title="重复的时段" :value="repeatComputed" />
        </router-link>
        <router-link :to="{path:'/edit/remind/',query:{mode: 'new'}}">
          <van-cell center title="提醒的时间" :value="`${remindComputed}个提醒`" />
        </router-link>
        <van-cell center title="激励的话">
          <input v-model="inspireComputed" placeholder="输入激励的话" />
        </van-cell>
      </van-cell-group>
      <van-popup v-model="show" position="right">
        <h2>选择重复的日期</h2>
        <p>您希望在一周里那几天执行这个习惯?</p>
        <aside>
          <DateBlock v-for="(item) in dateComputed.dates" :key="item.id" :checked="item.checked" :title="item.date" @click.native="select(item.id)" />
        </aside>
        <van-button @click="handleShow" size="large">保存</van-button>
      </van-popup>
    </section>
    <van-button @click="handleNew" class="button" size="large">{{mode === 'new' ? '新建' : '保存'}}</van-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Field, Cell, CellGroup, Popup, Button } from 'vant';
import { State, Mutation } from 'vuex-class';

import Circles from '@/components/common/Circle/Circle.vue';
import DateBlock from '@/components/common/DateBlock/DateBlock.vue';
import config from '@/config';
import _ from '@/utils';
import { HabitList as HabitListState } from '@/store/state';

@Component({
  components: {
    [Field.name]: Field,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Popup.name]: Popup,
    [Button.name]: Button,
    DateBlock,
    Circles,
  },
})
export default class Habit extends Vue {
  @State private habitList!: HabitListState[];
  @Mutation
  private selectDate!: (payload: { habitId: number; id: number }) => void;
  @Mutation
  private changeName!: (payload: { id: number; value: string }) => void;
  @Mutation
  private changInspire!: (payload: { id: number; value: string }) => void;
  @Mutation
  private changeMode!: (payload: { id: number; value: string }) => void;
  private show!: boolean;
  private value?: string;
  private name?: string;
  private habitLibrary!: object[];
  private id!: number;
  private index!: number;
  private mode!: string;
  private data() {
    const id: number = parseInt((this.$route.query.id) as string, 10);
    const mode = id > config.habitLibrary.length ? 'edit' : 'new';
    return {
      name,
      value: '',
      show: false,
      mode,
    };
  }

  // 获取当前习惯的id
  private created() {
    if (this.mode === 'edit') {
      this.id = parseInt((this.$route.query.id) as string, 10);
      // @ts-ignore
      const Index = _.findIndex(this.habitList, this.id);
      this.index = Index!;
      return;
    }
    const list = this.habitList;
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      if (element.mode === 'creating') {
        this.id = element.id;
        this.index = index;
        return;
      }
    }
    this.id = -1;
  }

  private get nameComputed() {
    const habit = this.habitList[this.index];

    return habit.habitInfo.habitName;
  }
  private set nameComputed(name) {
    this.changeName({ id: this.id, value: name });
  }
  private get inspireComputed() {
    const habit = this.habitList[this.index];
    return habit.habitInfo.inspire;
  }
  private set inspireComputed(name) {
    this.changInspire({ id: this.id, value: name });
  }

  // 计算当前图标
  private get iconComputed() {
    const habit = this.habitList[this.index];
    return habit.iconName;
  }
  // 计算重复时间段
  private get repeatComputed() {
    const { activeTimes, timeSlotList } = this.habitList[this.index].habitInfo;
    // @ts-ignore
    return timeSlotList.find((item: any) => item.id === activeTimes).title;
  }
  // 计算提醒个数
  private get remindComputed() {
    const { remind } = this.habitList[this.index].habitInfo;
    const num = (remind as any[]).filter((item) => item.open === true).length;
    return num;
  }
  // 计算当前颜色
  private get colorComputed() {
    const habit = this.habitList[this.index];
    const color = habit && habit.color ? habit.color : '#fff';

    return color;
  }
  // 通过计算属性获取当前每周哪几天需要重复训练
  private get dateComputed() {
    const dates = this.habitList[this.index].habitInfo.RepeatingDate;
    const currentDates = [];
    let value: string = '';
    for (let i = 0; i < dates.length; i++) {
      if (dates[i].checked) {
        currentDates.push(dates[i]);
        const result = _.getDate(dates[i].date);
        value += result;
      }
    }

    return {
      value,
      dates,
      currentDates,
    };
  }
  // 对话框控制
  private handleShow() {
    this.show = !this.show;
  }
  // 重复的日期选择
  private select(id: number) {
    this.selectDate({ habitId: this.id, id });
  }

  // 创建此习惯
  private handleNew() {
    this.changeMode({ id: this.id, value: 'done' });
    if (this.mode === 'edit') {
      this.$router.go(-1);
      return;
    }
    this.$router.go(-2);
  }
}
</script>

<style src="./style.scss" lang="scss" scoped>
</style>
