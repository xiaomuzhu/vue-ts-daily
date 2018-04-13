<template>
  <div class="habitList">
    <van-cell-swipe :right-width="65" :left-width="65" class="listSwipe">
      <aside class="edit" slot="left">编辑</aside>
      <van-cell-group class="listGroup">
        <van-cell title="单元格" value="内容" class="listCell">
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
    @Prop() private msg!: string;
  }
</script>


<style src="./style.scss" lang="scss" scoped>

</style>

