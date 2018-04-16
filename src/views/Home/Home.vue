<template>
  <div class="today">
    <section>
      <van-collapse v-model="activeNames">
        <van-collapse-item name="1">
          <p slot="title">
            <icon name="time" />起床</p>
          <aside @click="finish">
            <Circles radius="3.5rem" :activeColor="color">
              <icon name="wudao" slot="icon" />
            </Circles>
          </aside>
        </van-collapse-item>
      </van-collapse>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Collapse, CollapseItem } from 'vant';
import Circles from '@/components/common/Circle/Circle.vue';

@Component({
  components: {
      [Collapse.name]: Collapse,
      [CollapseItem.name]: CollapseItem,
      Circles,
  },
})
  export default class Today extends Vue {
    private color: string;
    private data() {
      return {
        activeNames: ['1'],
        color: '#fff',
      }
    }
    private finish() {
      if (this.color === 'yellow') {
        this.color = '#fff'
      } else {
        this.color = 'yellow'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .today {
    height: calc(100vh - 7rem);
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    .van-collapse-item {
      margin-bottom: 1rem;
      p {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        @include font(1rem);
        svg {
          width: 1.2rem;
          height: 1.2rem;
          margin-right: 0.5rem;
        }
      }
      aside {
        min-height: 5rem;
        div {
          border: solid 0.05rem black;
          border-radius: 50%;
          width: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 0 3px 3px rgba(130, 130, 130, 0.3);
          svg {
            width: 3rem;
            height: 3rem;
          }
        }
      }
    }
  }
</style>
