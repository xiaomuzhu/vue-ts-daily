<template>
  <div class="habit">
    <!-- 习惯图标 -->
    <section class="icon">
      <router-link :to="{path:'/edit/icon/',query:{mode: 'new'}}">
        <div class="cir">
          <Circles radius="3.5rem" :activeColor="colorComputed">
            <icon :name="iconComputed" slot="icon" />
          </Circles>
        </div>
      </router-link>
    </section>
    <!-- 输入习惯名称 -->
    <section class="field">
      <van-field placeholder="请输入名称" />
    </section>
    <!-- 习惯设置 -->
    <section>
      <van-cell-group>
        <van-cell clickable is-link center @click="handleShow" title="习惯的重复" :value="dateComputed.value" />
        <router-link :to="{path:'/edit/times/',query:{mode: 'new'}}">
          <van-cell center title="重复的时段" value="内容" />
        </router-link>
        <router-link :to="{path:'/edit/remind/',query:{mode: 'new'}}">
          <van-cell center title="提醒的时间" value="内容" />
        </router-link>
        <van-cell center title="激励的话">
          <input v-model="value" style="float: right" placeholder="输入一句激励的话" />
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
    @Mutation private selectDate: (id: number) => void
    private show ?: boolean;
    private value ?: string;
    private habitLibrary: object[];
    private data() {
      const id: number = parseInt(this.$route.query.id, 10);
      let  title;// tslint:disable
      if (id !== 0) {
        title = config.habitLibrary[id - 1].title
      } else {
        title = (config as any).newHabit.title;
      }
      return {
        title,
        value: '',
        show: false,
      }
    }

    // 计算当前颜色
    private get iconComputed() {
      const len = this.habitList.length;
      const habit = this.habitList[len - 1];
      return habit.iconName;
    }


    // 计算当前颜色
    private get colorComputed() {
      const len = this.habitList.length;
      const habit = this.habitList[len - 1];
      return habit.color;
    }
    // 通过计算属性获取当前每周哪几天需要重复训练
    private get dateComputed() {
      const length = this.habitList.length
      const dates = this.habitList[length - 1].habitInfo.RepeatingDate;
      let value: string = '';
      for (let i = 0; i < dates.length; i++) {
        if (dates[i]['checked']) {
          let result = utils.getDate(dates[i]['date'])
          value += result
        }
      }
      return {value, dates};
    }
    // 对话框控制
    private handleShow() {
      this.show = !this.show;
    }
    // 重复的日期选择
    private select(id: number) {
      this.selectDate(id);
    }
    private handleNew() {
      this.$router.go(-2);
    }
    private onClickLeft() {
      this.$router.go(-2);
    }
  }
</script>

<style src="./style.scss" lang="scss" scoped>

</style>
