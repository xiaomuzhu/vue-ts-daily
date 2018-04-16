<template>
  <div class="times">
    <!-- 说明文字 -->
    <section class="panel">
        <p>大致在一天中哪个时间段执行这个习惯呢?</p>
    </section>
    <!-- 删除按钮 -->
    <section class="list">
        <van-radio-group v-model="radio">
            <van-cell-group>
                <van-cell v-for="item in times" :key="item.id">
                    <van-radio :name="item.id">{{item.title}}</van-radio>
                </van-cell>
            </van-cell-group>
        </van-radio-group>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Radio, Cell, CellGroup, RadioGroup } from 'vant';

import config from '@/config';

@Component({
  components: {
      [Radio.name]: Radio,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [RadioGroup.name]: RadioGroup,
  },
})
  export default class Calendar extends Vue {
    private times: any[];
    private radio: string;

  public data() {
    return {
      times: (config as any).defaultTimes,
      radio: 0,
    }
  }

    // public changeValue(value) {
    //   console.log(value);

    //   this.message = value;
    // }


  }
</script>

<style src="./style.scss" lang="scss" scoped>

</style>
