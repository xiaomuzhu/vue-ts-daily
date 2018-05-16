<template>
    <div class="circle" :style="styleObj">
        <slot name="icon"></slot>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({})
export default class Circles extends Vue {
  @Prop() private radius!: string;
  @Prop() private activeColor!: string;
  private styleObj!: {
    background: string;
    width: string;
    height: string;
  };
  private data() {
    return {
      styleObj: {
        background: this.activeColor,
        width: this.radius,
        height: this.radius,
      },
    };
  }
  @Watch('activeColor')
  private changeColor(val: string, old: string) {
    this.styleObj.background = val;
  }
}
</script>

<style src="./style.scss" lang="scss" scoped>
.circle {
  border: solid 2px black;
  border-radius: 50%;
  margin: 0;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
