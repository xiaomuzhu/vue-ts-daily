<template>
  <div class="habit">
    <!-- 习惯图标 -->
    <section>
        <icon :name="name" />
    </section>
    <!-- 输入习惯名称 -->
    <section class="field">
        <van-field  placeholder="请输入名称" />
    </section>
    <!-- 习惯设置 -->
    <section>
        <van-cell-group>
            <van-cell clickable is-link center  @click="handleShow" title="习惯的重复" value="内容" />
            <van-cell center title="重复的时段" value="内容" />
            <van-cell center title="提醒的时间" value="内容" />
            <van-cell center title="激励的话" value="内容" />
        </van-cell-group>
            <van-popup v-model="show" position="right">
                <h2>选择重复的日期</h2>
                <p>您希望在一周里那几天执行这个习惯?</p>
                <aside>
                    <DateBlock title="周一见"/>
                    <DateBlock title="周一见"/>
                    <DateBlock title="周一见"/>
                    <DateBlock title="周一见"/>
                    <DateBlock title="周一见"/>
                    <DateBlock title="周一见"/>
                </aside>
                <van-button @click="handleShow" size="large">保存</van-button>
            </van-popup>
    </section>
    <van-button  class="button" size="large">新建</van-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Field, Cell, CellGroup, Popup, Button } from 'vant';

import DateBlock from '@/components/common/DateBlock/DateBlock.vue';
import config from '@/config';

@Component({
  components: {
      [Field.name]: Field,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Popup.name]: Popup,
      [Button.name]: Button,
      DateBlock,
  },
})
  export default class Habit extends Vue {
    private name ?: string;
    private show ?: boolean;
    private habitLibrary: object[];
    private data() {
      const id: number = parseInt(this.$route.query.id, 10);
      const name = config.habitLibrary[id - 1].name
      const title = config.habitLibrary[id - 1].title
      return {
        name,
        title,
        show: false,
      }
    }

    private handleShow() {
        this.show = !this.show;
    }


    private onClickLeft() {
      this.$router.go(-1);
    }
  }
</script>

<style src="./style.scss" lang="scss" scoped>

</style>
