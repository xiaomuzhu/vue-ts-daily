<template>
  <div class="habit">
    <van-tabs @click="changeTitle">
      <van-tab v-for="(item, index) in tabsComputed" :title="item" :key="index">
        <transition-group name="fade" tag="ul" class="list-group">
        <List v-for="item in ChangeTab" :key="item.id" @click-right="del(item.id)" @click-left="edit(item.id)" rightValue="归档" leftValue="编辑" :id="item.id" :color="item.color" :habitLog="item.habitLog" :habitInfo="item.habitInfo" :iconName="item.iconName" />
        </transition-group>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Tab, Tabs } from 'vant';
import { State, Mutation } from 'vuex-class';

import { HabitList as HabitListState } from '@/store/state';

import List from '@/components/common/HabitList/List.vue';

@Component({
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    List,
  },
})
export default class Habit extends Vue {
  @State private habitList!: HabitListState[];
  @Mutation private deleteHabit!: (id: number) => void;
  @Mutation
  private changeMode!: (payload: { id: number; value: string }) => void;
  private currentTitle!: string;
  private data() {
    return {
      currentTitle: '全部',
    };
  }

  private edit(id: number) {
    this.$router.push(`/edit/habit?id=${id}`);
    this.changeMode({ id, value: 'editing' });
  }

  private del(id: number) {
    this.deleteHabit(id);
  }

  // 计算出全部tab标签
  private get tabsComputed() {
    const total: string[] = [];
    (this.habitList as any).forEach((item: any) => {
      item.habitInfo.timeSlotList.forEach((element: any) => {
        if (item.mode === 'done') {
          total.push(element.title);
        }
      });
    });
    const tabs = [...new Set(total)];
    tabs.unshift('全部');

    return tabs;
  }
  private changeTitle(index: number, title: string) {
    this.currentTitle = title;
  }
  // 切换tab后重新计算符合当前标准的列表
  private get ChangeTab() {
    const total: HabitListState[] = [];
    if (this.currentTitle !== '全部') {
      (this.habitList as HabitListState[]).forEach((item: HabitListState) => {
        if (item.isActive && item.mode === 'done') {
          const { activeTimes, timeSlotList } = item.habitInfo;
          // @ts-ignore
          const timeSolt = timeSlotList.find(
            (ele: any) => ele.id === activeTimes,
          );
          if (timeSolt!.title === this.currentTitle) {
            total.push(item);
          }
        }
      });
    } else {
      (this.habitList as HabitListState[]).forEach((item: HabitListState) => {
        if (item.isActive && item.mode === 'done') {
          total.push(item);
        }
      });
    }
    return total;
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.habit {
  width: 100%;
  height: calc(100vh - 7rem);
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}
</style>
