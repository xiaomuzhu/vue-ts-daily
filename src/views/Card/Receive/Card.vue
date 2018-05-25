<template>
  <div class="card">
    <!-- 说明 -->
    <section>
      <p v-if="num > 0">{{`你还需要完成${num}个习惯来获得此卡片`}}</p>
      <p v-else>您已完成全部习惯请领取卡片</p>
    </section>
    <!-- 卡片 -->
    <section>
      <Card :saying="saying" :id="id" ></Card>
    </section>
    <!-- 领取按钮 -->
    <section>
      <van-button @click="receive" :disabled="today.isReceived" :class="{ done: isDone }">领取</van-button>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Mutation, State } from 'vuex-class';
import { Button, Toast } from 'vant';
import moment from 'moment';

import { HabitList as HabitListState } from '@/store/state';
import Card from '@/components/common/Card/Card.vue';
import _ from '@/utils';

@Component({
  components: {
    [Button.name]: Button,
    Card,
  },
})
export default class Library extends Vue {
  @Mutation private receiveCard!: () => void;
  @State private habitList!: HabitListState[];
  @State
  private today!: {
    active: string[] | never[] | number[];
    finishedDate: string[] | never[];
    isReceived: boolean;
  };

  private title?: string;
  private num!: number;
  private isDone!: boolean;
  private isReceived!: boolean;
  private data() {
    return {
      saying: '自己打败自己是最可悲的失败，自己战胜自己是最可贵的胜利。',
      id: 1,
      num: 0,
      isDone: false,
      isReceived: false,
    };
  }

  private mounted() {
    const id = _.getDaysId();
    this.habitList.forEach(item => {
      item.habitLog.date.filter(ele => ele.id === id).forEach(e => {
        if (!e.isFinished) {
          this.num++;
        }
      });
    });
    if (this.num > 0) {
      this.isDone = false;
    } else {
      this.isDone = true;
    }
  }

  private receive() {
    if (!this.isDone) {
      Toast('请完成全部任务再来领取~');
    } else {
      const { length } = this.today.finishedDate;

      const today = this.today.finishedDate[length - 1];
      if (!length) {
        Toast('领取成功~');
        this.receiveCard();
        this.$router.go(-1);
        return;
      }
      const tip = moment(today).isSame(moment())
        ? '今天您已经领取过了'
        : '领取成功~';
      Toast(tip);
      this.receiveCard();
      this.$router.go(-1);
    }
  }
}
</script>

<style  lang="scss" scoped>
@import '../../../style/mixin';
.card {
  margin: 0;
  height: calc(100vh - 6rem);
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
p {
  @include font(0.8rem, 150%);
  color: #c0c0c0;
}
.done {
  background-color: #34ba3a;
}
</style>
