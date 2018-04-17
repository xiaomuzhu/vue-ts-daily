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
import { CellSwipe, Cell, CellGroup } from 'vant';
import { State, Mutation } from 'vuex-class';

import config from '@/config';
import Circles from '@/components/common/Circle/Circle.vue';
import { HabitList as HabitListState } from '@/store/state';

@Component({
  components: {
      [CellSwipe.name]: CellSwipe,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      Circles,
  },
})
    export default class IconSetting extends Vue {
        @State private habitList: HabitListState[];
        @Mutation private selectColor: (color: string) => void
        @Mutation private selectIcon: (icon: string) => void

        private iconSetting: string[];
        private colorSetting: string[];
        private data() {

            return {
                iconSetting: (config as any).iconSetting,
                colorSetting: (config as any).colorSetting,
            }
        }
        // 计算当前icon名称
        private get iconComputed() {
            const len = this.habitList.length;
            const iconName = this.habitList[len - 1].iconName;
            return iconName;
        }
        // 计算当前背景颜色
        private get colorComputed() {
            const len = this.habitList.length;
            const {
                color,
            } = this.habitList[len - 1];
            return color;
        }
        private handleColor(color: string) {
            this.selectColor(color);
        }
        private handleIcon(name: string) {
            this.selectIcon(name);
        }
    }
</script>

<style src="./style.scss" lang="scss" scoped>

</style>
