<template>
  <div class="home">
    <h1>sd</h1>
        <vue-event-calendar :events="demoEvents"       @day-changed="handleDayChanged"
      @month-changed="handleMonthChanged"></vue-event-calendar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'; // @ is an alias to /src

@Component({
  components: {
  },
})
export default class Home extends Vue {
    public data() {
    return {
      demoEvents: [{
        date: '2018/4/12', // 必填
        title: 'Foo', // 必填
      }, {
        date: '2018/4/15',
        title: 'Bar',
        desc: 'description',
        customClass: 'highlight', // 自定义日历单元格的Class，会加到对应的日历单元格上
      }],
    }
  }

    public handleDayChanged(data) {
      console.log('date-changed', data)
    }
    public handleMonthChanged(data) {
      console.log('month-changed', data)
    }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';

.home {
  height: calc(100vh - 7rem);
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

</style>
