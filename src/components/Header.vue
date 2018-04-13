<template>
    <header>
        <Icon v-if="!!headerInfo.left" :name="headerInfo.left"></Icon>
        <div v-else></div>
        <h3>{{headerInfo.title}}</h3>
        <Icon v-if="!!headerInfo.right" :name="headerInfo.right"></Icon>
        <div v-else></div>
    </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';

import { HeaderInfo, PageInfo } from '@/store/state';
import Icon from './common/Icon/HeaderIcon';

@Component({
    components: {
        Icon,
    },
})
export default class Header extends Vue {
    @State private headerInfo!: HeaderInfo;
}
</script>

<style lang="scss" scoped>
header {
    display: grid;
    grid-template-columns: 3rem auto 3rem;
    align-items:center;
    grid-row-end:end;
    width: 100%;
    height: 3.5rem;
    min-height: 8%;
    background-color: #fff;
}
</style>

