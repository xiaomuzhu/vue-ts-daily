<template>
  <div class="habit">
    <!-- 习惯图标 -->
    <section>
      <router-link :to="{path:'/edit/icon/',query:{mode: 'new'}}"><icon :name="name" /></router-link>
    </section>
    <!-- 输入习惯名称 -->
    <section class="field">
      <van-field placeholder="请输入名称" />
    </section>
    <!-- 习惯设置 -->
    <section>
      <van-cell-group>
        <van-cell clickable is-link center @click="handleShow" title="习惯的重复" :value="dateComputed" />
        <router-link :to="{path:'/edit/times/',query:{mode: 'new'}}"><van-cell center title="重复的时段" value="内容" /></router-link>
        <router-link :to="{path:'/edit/remind/',query:{mode: 'new'}}"><van-cell center title="提醒的时间" value="内容" /></router-link>
        <van-cell center title="激励的话" >
          <input v-model="value" style="float: right" placeholder="输入一句激励的话" />
        </van-cell>
      </van-cell-group>
      <van-popup v-model="show" position="right">
        <h2>选择重复的日期</h2>
        <p>您希望在一周里那几天执行这个习惯?</p>
        <aside>
          <DateBlock v-for="(item) in RepeatingDate" :key="item.id" :checked="item.checked" :title="item.date" @click.native="selectDate(item.id)" />
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
import { State } from 'vuex-class';

import DateBlock from '@/components/common/DateBlock/DateBlock.vue';
import config from '@/config';
import utils from '@/utils';
import { RepeatingDateState, HabitList } from '@/store/state';

@Component({
  components: {
      [Field.name]: Field,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Popup.name]: Popup,
      [Button.name]: Button,
      DateBlock,
  },
})
  export default class Habit extends Vue {
    private habitList: HabitList;
    private name ?: string;
    private show ?: boolean;
    private value ?: string;
    private habitLibrary: object[];
    private RepeatingDate: RepeatingDateState[];
    private data() {
      const id: number = parseInt(this.$route.query.id, 10);
      let name, title;// tslint:disable
      if (id !== 0) {
        name = config.habitLibrary[id - 1].name
        title = config.habitLibrary[id - 1].title
      } else {
        name = (config as any).newHabit.name;
        title = (config as any).newHabit.title;
      }
      return {
        name,
        title,
        value: '',
        show: false,
        RepeatingDate: [{
          id: 0,
          date: '星期一',
          checked: true
        }, {
          id: 1,
          date: '星期二',
          checked: true
        }, {
          id: 2,
          date: '星期三',
          checked: true
        }, {
          id: 3,
          date: '星期四',
          checked: true
        }, {
          id: 4,
          date: '星期五',
          checked: true
        }, {
          id: 5,
          date: '星期六',
          checked: true
        }, {
          id: 6,
          date: '星期日',
          checked: true
        }],
      }
    }

    // 通过计算属性获取当前每周哪几天需要重复训练
    private get dateComputed() {
      const dates = this.RepeatingDate;
      let value: string = '';
      for (let i = 0; i < dates.length; i++) {
        if (dates[i]['checked']) {
          let result = utils.getDate(dates[i]['date'])
          value += result
        }
      }
      return value;
    }
    // 对话框控制
    private handleShow() {
      this.show = !this.show;
    }
    // 重复的日期选择
    private selectDate(id: number) {
      this.RepeatingDate.forEach(item => {
        if (item.id === id) {
          item.checked = false;
        }
      });
      console.log(this.RepeatingDate);
    }
    private handleNew() {
      const timestamp = ( new Date()).valueOf();
      this.habitList.id = timestamp;

      this.$router.go(-2);
    }
    private onClickLeft() {
      this.$router.go(-2);
    }
  }
</script>

<style src="./style.scss" lang="scss" scoped>

</style>
