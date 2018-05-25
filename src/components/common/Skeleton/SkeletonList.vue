<template>
        <skeleton-loading>
            <row
                    v-for="i in num"
                    :key="i"
                    :gutter="{top: '10px', bottom: '10px'}"
            >
                <column :span="23" :gutter="10">
                        <square-skeleton 
                            :count="2"
                            :boxProperties="{
                                bottom: '15px',
                                width: '250px',
                                height: '15px'
                            }"
                        >
                        </square-skeleton>
                </column>
            </row>
        </skeleton-loading>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({})
export default class Skeleton extends Vue {
  @Prop() private num!: number;
}
</script>

<style lang="scss" scoped>
@import '../../../style/mixin';

</style>
