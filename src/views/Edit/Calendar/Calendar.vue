<template>
  <div class="edit">
    <!-- 日历 -->
    <section class="calendar">
        <vue-event-calendar :events="habitEvents"  @day-changed="handleDayChanged"
      @month-changed="handleMonthChanged"></vue-event-calendar>
    </section>
    <!-- 习惯记录面板 -->
    <section class="panel">
      <ul>
        <li><span><icon name="target"/>总共减持的天数</span><span>6d</span></li>
        <li><span><icon name="up"/>当前连续天数</span><span>6d</span></li>
        <li><span><icon name="record"/>最长连续记录</span><span>6d</span></li>
        <li><span><icon name="create"/>建立时间</span><span>2018-4-9</span></li>
        <li><span><icon name="total"/>总共加入天数</span><span>6d</span></li>
      </ul>
    </section>
    <!-- 删除按钮 -->
    <van-button  type="danger" size="mini">删除</van-button>
      <ClockPopup :show="show" @save="handleHide"></ClockPopup>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Field, Popup, Button } from 'vant';

import DateBlock from '@/components/common/DateBlock/DateBlock.vue';
import ClockPopup from '@/components/common/ClockPopup/ClockPopup.vue';
import config from '@/config';

@Component({
  components: {
      [Field.name]: Field,
      [Popup.name]: Popup,
      [Button.name]: Button,
      DateBlock,
      ClockPopup,
  },
})
  export default class Calendar extends Vue {
    private name ?: string;
    private show ?: boolean;
    private habitLibrary: object[];
    private habitEvents: any[];


  public data() {
    return {
      habitEvents: [{
        date: '2018/4/12', // 必填
        title: 'Foo', // 必填
      }, {
        date: '2018/4/15',
        title: 'Bar',
        desc: 'description',
        customClass: 'highlight', // 自定义日历单元格的Class，会加到对应的日历单元格上
      }],
      show: false,
    }
  }

    // public changeValue(value) {
    //   console.log(value);

    //   this.message = value;
    // }

    public handleHide() {
      this.show = false;
    }

    public handleDayChanged(data: any) {
      this.habitEvents.push({
        date: data.date,
        title: '打卡',
      })
      this.show = true;
    }
    public handleMonthChanged(data: any) {
      console.log('month-changed', data)
    }

  }
</script>

<style src="./style.scss" lang="scss" scoped>

</style>
