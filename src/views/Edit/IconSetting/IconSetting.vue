<template>
    <div class="iconSetting">
        <!-- 当前图表 -->
        <section class="icon">
            <Circles class="cir" radius="3.5rem" :activeColor="colorComputed">
                <icon :name="iconComputed" slot="icon" />
            </Circles>
        </section>
        <!-- 备选图标 -->
        <section class="alternative">
            <div class="alternativeIcon" v-for="(item, index) in iconSetting" :key="index" @click="handleIcon(item)">
                <icon :name="item" />
            </div>
        </section>
        <!-- 图标背景 -->
        <section class="colorSetting">
            <div class="background" v-for="(item, index) in colorSetting" :key="index" @click="handleColor(item)">
                <div v-bind:style="{ backgroundColor: item }"></div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { SwipeCell, Cell, CellGroup } from 'vant';
import { State, Mutation } from 'vuex-class';

import config from '@/config';
import Circles from '@/components/common/Circle/Circle.vue';
import { HabitList as HabitListState } from '@/store/state';

@Component({
  components: {
    [SwipeCell.name]: SwipeCell,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    Circles,
  },
})
export default class IconSetting extends Vue {
  @State private habitList!: HabitListState[];
  @Mutation
  private selectColor!: (payload: { id: number; color: string }) => void;
  @Mutation
  private selectIcon!: (payload: { id: number; icon: string }) => void;
  private id!: number;
  private index!: number;

  private iconSetting!: string[];
  private colorSetting!: string[];
  private data() {
    return {
      iconSetting: (config as any).iconSetting,
      colorSetting: (config as any).colorSetting,
    };
  }
  // 获取当前习惯的id
  private created() {
    const list = this.habitList;
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      if (element.mode === 'creating' || element.mode === 'editing') {
        this.id = element.id;
        this.index = index;
        return;
      }
    }
    this.id = -1;
  }
  // 计算当前icon名称
  private get iconComputed() {
    const len = this.habitList.length;
    const iconName = this.habitList[this.index].iconName;
    return iconName;
  }
  // 计算当前背景颜色
  private get colorComputed() {
    const len = this.habitList.length;
    const { color } = this.habitList[this.index];

    return color;
  }
  private handleColor(color: string) {
    this.selectColor({ id: this.id, color });
  }
  private handleIcon(name: string) {
    this.selectIcon({ id: this.id, icon: name });
  }
}
</script>

<style src="./style.scss" lang="scss" scoped>
</style>
