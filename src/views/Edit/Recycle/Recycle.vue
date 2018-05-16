<template>
  <div class="recycle">
    <List v-for="item in recycleList" :key="item.id" :id="item.id" :color="item.color" :habitLog="item.habitLog" :habitInfo="item.habitInfo" :iconName="item.iconName">
      <aside slot="del" @click="remove(item.id)" >删除</aside><aside @click="activate(item.id)" class="act" slot="act">激活</aside>
    </List>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';

import { HabitList as HabitListState } from '@/store/state';

import List from '@/components/common/HabitList/List.vue';

@Component({
  components: {
    List,
  },
})
export default class Recycle extends Vue {
  @State private habitList!: HabitListState[];
  @Mutation private removeHabit!: (id: number) => void;
  @Mutation private activateHabit!: (id: number) => void;
  private currentTitle!: string;

  public activate(id: number) {
    this.activateHabit(id);
  }

  public remove(id: number) {
    this.removeHabit(id);
  }

  private onClick(index: number, title: string) {
    this.currentTitle = title;
  }
  // 获取被归档的列表
  private get recycleList() {
    const total: any[] = [];
    (this.habitList as any).forEach((item: HabitListState) => {
      if (!item.isActive) {
        total.push(item);
      }
    });
    return total;
  }
}
</script>

<style lang="scss" scoped>
@import '../../../style/mixin';
.recycle {
  overflow: auto;
  width: 100%;
  height: calc(100vh - 7rem);
  display: flex;
  flex: none;
  justify-content: flex-start;
  flex-direction: column;
  aside {
    display: inline-flex;
    background-color: $warn;
    @include font(0.9rem);
    color: #fff;
    width: 3rem;
    height: 100%;
    margin: 0;
    justify-content: center;
    align-items: center;
  }
  .act {
    background-color: $edit;
  }
}
</style>
