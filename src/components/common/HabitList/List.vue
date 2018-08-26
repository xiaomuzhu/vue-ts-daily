<template>
  <div class="habitList">
    <van-swipe-cell :right-width="65" :left-width="65" class="listSwipe">
      <aside class="edit" v-if="leftValue" slot="left" @click="$emit('click-left', id)" >{{leftValue}}</aside>
      <slot v-else slot="left" @click="$emit('click-right', id)" name="act"></slot>
      <van-cell-group class="listGroup">
        <van-cell   class="van-ellipsis listCell" :url="`/edit/calendar?id=${id}`" :value="habitLog.totalHabitDays + '天'" :style="{ background: color }" >
          <template slot="title">
            <icon :name="iconName" />
            <span>{{habitInfo.habitName}}</span>
          </template>
        </van-cell>
      </van-cell-group>
      <aside class="delete" v-if="rightValue" slot="right" @click="$emit('click-right', id)">{{rightValue}}</aside>
      <slot v-else slot="right" @click="$emit('click-right', id)" name="del"></slot>
    </van-swipe-cell>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Progress, Step, Steps, SwipeCell, Cell, CellGroup } from 'vant';
import { HabitList as HabitListState } from '@/store/state';
@Component({
  components: {
    [Progress.name]: Progress,
    [Step.name]: Step,
    [Steps.name]: Steps,
    [SwipeCell.name]: SwipeCell,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
})
export default class HabitList extends Vue {
  @Prop() private habitInfo!: object;
  @Prop() private habitLog!: object;
  @Prop() private iconName!: string;
  @Prop() private color!: string;
  @Prop() private id!: number;
  @Prop() private rightValue?: string;
  @Prop() private leftValue?: string;
}
</script>


<style src="./style.scss" lang="scss" scoped>
</style>
