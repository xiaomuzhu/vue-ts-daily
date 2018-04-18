<template>
  <div class="today">
    <section>
      <van-collapse v-for="(item, index) in dayComputed.habits" :key="item.id" @change="change" v-model="today.active">
        <van-collapse-item :name="index">
          <p slot="title">
            <icon name="time" />{{item.title}}</p>
          <aside v-for="ele in item.habits" :key="ele.id" @click="finish(ele.id)">
            <Circles radius="3.5rem" :activeColor="color">
              <icon :name="ele.iconName" slot="icon" />
            </Circles>
          </aside>
        </van-collapse-item>
      </van-collapse>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Collapse, CollapseItem } from 'vant';
import { Mutation, State } from 'vuex-class';
import moment from 'moment';

import config from '@/config';
import { HabitList as HabitListState } from '@/store/state';
import _ from '@/utils';

import Circles from '@/components/common/Circle/Circle.vue';

@Component({
  components: {
      [Collapse.name]: Collapse,
      [CollapseItem.name]: CollapseItem,
      Circles,
  },
})
  export default class Today extends Vue {
    @Mutation private createHabit: (habit: HabitListState) => void;
    @Mutation private changeFinished: (id: number) => void;
    @Mutation private changeCollapse: (habit: number[]| never[]) => void;
    @State private habitList: HabitListState[];
    @State private today: object;
    private color: string;
    private data() {
      return {
        color: '#fff',
      }
    }
    private get dayComputed() {
      const current = _.dateComparison(this.habitList);
      const timeList = new Set();
      for (let index = 0; index < current.length; index++) {
        const element = current[index];
        const {
          timeSlotList,
          activeTimes,
        } = element.habitInfo;
        const time = timeSlotList.find((e) => e.id === activeTimes);
        // time.habits.push(element);
        timeList.add(time.title);
      }
      const list = Array.from(timeList);
      const currentList = [];
      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        for (let i = 0; i < current.length; ++i) {
          const item = current[i];
          const {
            timeSlotList,
            activeTimes,
          } = item.habitInfo;
          const time = timeSlotList.find((e) => e.id === activeTimes);
          if (time.title === element) {
            const k = {
              habits: [],
            };
            k.title = element;
            k.id = index;
            k.habits.push(item);
            currentList.push(k)
          }
        }
      }
      return {
        current,
        list,
        habits: currentList,
      }
    }
    private change(activeNames: number[]| never[]) {
      this.changeCollapse(activeNames);
    }
    private finish(id: number) {
      if (this.color === 'yellow') {
        this.color = '#fff';
      } else {
        this.color = 'yellow';
      }
      this.changeFinished(id);
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
        div {
          border: solid 1px black;
          border-radius: 50%;
          width: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
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
