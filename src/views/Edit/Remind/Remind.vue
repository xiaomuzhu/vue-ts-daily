<template>
  <div class="remind">
    <!-- 说明文字 -->
    <section class="panel">
        <p>您打算在那个时间设置提醒呢?</p>
    </section>
    <!-- 删除按钮 -->
    <section class="list">
        
            <van-cell-group v-if="!!remind.length">
                <van-cell v-for="item in remind" :key="item.id">
                    <van-switch-cell :title="item.time" v-model="item.isOpen" />
                    <!-- <span solt="title">{{item.time}}</span> -->
                </van-cell>
            </van-cell-group>

    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { SwitchCell, Cell, CellGroup } from 'vant';

import config from '@/config';
import { remindState } from '@/store/state'

@Component({
  components: {
      [SwitchCell.name]: SwitchCell,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
  },
})
  export default class Calendar extends Vue {
    private remind: remindState[] | never[];

  public data() {
    return {
      remind: [{time: '12:00', isOpen: true}],
    }
  }


public mounted() {
  const { path, query } = this.$route;
  const s = query ? `${path}?mode=${query.mode}` : path
  console.log(s)
}
    // public changeValue(value) {
    //   console.log(value);

    //   this.message = value;
    // }


  }
</script>

<style src="./style.scss" lang="scss" scoped>

</style>
