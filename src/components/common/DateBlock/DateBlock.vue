<template>
    <div class="date" :class="{checked: checked}" :checked="checked" @click="changeColor">
        {{title}}
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class DateBlock extends Vue {
  private checked: boolean;

  @Prop() private title: string;

  private data() {
    return {
      checked: true,
    };
  }

  private changeColor() {
    this.checked = !this.checked;
  }
}
</script>

<style src="./style.scss" lang="scss" scoped>
</style>
