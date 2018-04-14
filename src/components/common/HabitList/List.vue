<template>
  <div class="habitList">
    <van-cell-swipe :right-width="65" :left-width="65" class="listSwipe">
      <aside class="edit" slot="left">编辑</aside>
      <van-cell-group class="listGroup">
        <van-cell class="listCell" :value="habitLog.totalHabitDays" :style="{ background: color }" >
          <template slot="title">
            <icon :name="iconName" />
            <span>{{habitInfo.habitName}}</span>
          </template>
        </van-cell>
      </van-cell-group>
      <aside slot="right">归档</aside>
    </van-cell-swipe>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Prop,
    Vue,
  } from 'vue-property-decorator';
  import {
    Progress,
    Step,
    Steps,
    CellSwipe,
    Cell,
    CellGroup,
  } from 'vant';
  import {
    HabitList as HabitListState,
  } from '@/store/state';
  @Component({
    components: {
      [Progress.name]: Progress,
      [Step.name]: Step,
      [Steps.name]: Steps,
      [CellSwipe.name]: CellSwipe,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
    },
  })
  export default class HabitList extends Vue {
    @Prop()
    private habitInfo: object;
    @Prop()
    private habitLog: object;
    @Prop()
    private iconName: string;
    @Prop()
    private color: string;

  }
</script>


<style src="./style.scss" lang="scss" scoped>

</style>

