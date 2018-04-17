<template>
  <div class="recycle">
    <List v-for="item in recycleList" :key="item.id" leftValue="激活" rightValue="删除" @click-left="activate" @click-right="remove" :id="item.id" :color="item.color" :habitLog="item.habitLog" :habitInfo="item.habitInfo" :iconName="item.iconName" />
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
    @State private habitList: HabitListState[];
    @Mutation private deleteHabit: (id: number) => void;
    private currentTitle: string;

    public activate() {
      // this.$router.push
    }

    public remove(id: number) {
      this.deleteHabit(id);
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
        })
      return total
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../style/mixin';
  .habit {
    width: 100%;
    height: calc(100vh - 7rem);
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  }
</style>

