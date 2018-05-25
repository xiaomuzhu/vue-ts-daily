<template>
    <div class="date" :class="{checked: checked}" :checked="checked">
        {{title}}
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class DateBlock extends Vue {
  @Prop() private title!: string;
  @Prop() private checked!: boolean;
}
</script>

<style src="./style.scss" lang="scss" scoped>
</style>
