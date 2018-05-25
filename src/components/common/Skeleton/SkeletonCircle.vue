<template>
    <skeleton-loading>
        <circle-skeleton></circle-skeleton>
    </skeleton-loading>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({})
export default class Skeleton extends Vue {

}
</script>

<style lang="scss" scoped>
@import '../../../style/mixin';

</style>
