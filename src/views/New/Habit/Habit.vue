<template>
  <div class="habit">
    <!-- 习惯图标 -->
    <section class="icon">
      <router-link v-if="!!colorComputed" :to="{path:'/edit/icon/',query:{mode: 'new'}}">
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
          <input v-model="inspireComputed" style="float: right" placeholder="输入一句激励的话" />
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
    <van-button @click="handleNew" class="button" size="large">新建</van-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Field, Cell, CellGroup, Popup, Button } from 'vant';
import { State, Mutation } from 'vuex-class';

import Circles from '@/components/common/Circle/Circle.vue';
import DateBlock from '@/components/common/DateBlock/DateBlock.vue';
import config from '@/config';
import utils from '@/utils';
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
    @State private habitList: HabitListState[];
    @Mutation private selectDate: (habitId: number, id: number) => void;
    @Mutation private changeName: (id: number, value: string) => void;
    @Mutation private changInspire: (id: number, value: string) => void;
    @Mutation private changeMode: (id: number, value: string) => void;
    private show ?: boolean;
    private value ?: string;
    private name ?: string;
    private habitLibrary: object[];
    private id: number;
    private index: number;
    private data() {
      const id: number = parseInt(this.$route.query.id, 10);
      let title; // tslint:disable
      if (id !== 0) {
        title = config.habitLibrary[id - 1].title
      } else {
        title = (config as any).newHabit.title;
      }
      return {
        name,
        title,
        value: '',
        show: false,
      }
    }

        // 获取当前习惯的id
    private created() {
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
      const len = this.habitList.length;
      const habit = this.habitList[this.index];
      return habit.habitInfo.habitName
    }
    private set nameComputed(name) {
      this.changeName(this.id, name)
    }
    private get inspireComputed() {
      const len = this.habitList.length;
      const habit = this.habitList[this.index];
      return habit.habitInfo.inspire
    }
    private set inspireComputed(name) {
      this.changInspire(this.id, name)
    }

    // 计算当前颜色
    private get iconComputed() {
      const habit = this.habitList[this.index];
      return habit.iconName;
    }
    // 计算重复时间段
    private get repeatComputed() {
      const {
        activeTimes,
        timeSlotList
      } = this.habitList[this.index].habitInfo;
      return timeSlotList.find((item: any) => item.id === activeTimes).title;
    }
    // 计算提醒个数
    private get remindComputed() {
      const {
        remind
      } = this.habitList[this.index].habitInfo;
      const num = (remind as any[]).filter(item => item.open === true).length;
      return num;
    }
    // 计算当前颜色
    private get colorComputed() {
      const habit = this.habitList[this.index];
      console.log(habit);
      
      return habit.color;
    }
    // 通过计算属性获取当前每周哪几天需要重复训练
    private get dateComputed() {
      const length = this.habitList.length
      const dates = this.habitList[this.index].habitInfo.RepeatingDate;
      let value: string = '';
      for (let i = 0; i < dates.length; i++) {
        if (dates[i]['checked']) {
          let result = utils.getDate(dates[i]['date'])
          value += result
        }
      }
      return {
        value,
        dates
      };
    }
    // 对话框控制
    private handleShow() {
      this.show = !this.show;
    }
    // 重复的日期选择
    private select(id: number) {
      this.selectDate(this.id, id);
    }
    private handleNew() {
      this.changeMode(this.id, 'done')
      this.$router.go(-2);
    }
  }
</script>

<style src="./style.scss" lang="scss" scoped>

</style>
