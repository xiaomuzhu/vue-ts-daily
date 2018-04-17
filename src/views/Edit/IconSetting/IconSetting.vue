<template>
    <div class="iconSetting">
        <!-- 当前图表 -->
        <section class="icon">
            <Circles  class="cir" radius="3.5rem" :activeColor="color"><icon :name="name" slot="icon" /></Circles>
        </section>
        <!-- 备选图标 -->
        <section class="alternative">
            <div class="alternativeIcon" v-for="(item, index) in iconSetting" :key="index" @click="selectIcon(item)"><icon :name="item" /></div>
        </section>
        <!-- 图标背景 -->
        <section class="colorSetting">
            <div class="background" v-for="(item, index) in colorSetting" :key="index" @click="selectColor(item)"><div v-bind:style="{ backgroundColor: item }" ></div></div>            
        </section>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { CellSwipe, Cell, CellGroup } from 'vant';

import config from '@/config';
import Circles from '@/components/common/Circle/Circle.vue';


@Component({
  components: {
      [CellSwipe.name]: CellSwipe,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      Circles,
  },
})
    export default class IconSetting extends Vue {
        private color: string;
        private name: string;
        private iconSetting: string[];
        private colorSetting: string[];
        private data() {
            // const name = 'diy'
            return {
                color: '#e2e3e8',
                name: 'diy',
                iconSetting: (config as any).iconSetting,
                colorSetting: (config as any).colorSetting,
            }
        }

        private selectColor(color: string) {
            this.color = color;
        }

private selectIcon(name: string) {
            this.name = name;
            console.log(name);

        }


    }
</script>

<style src="./style.scss" lang="scss" scoped>

</style>
