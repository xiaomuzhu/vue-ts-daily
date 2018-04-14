<template>
    <header>
        <Icon v-if="!!headerInfo.left"  :name="headerInfo.left"></Icon>
        <div v-else></div>
        <h3>{{headerInfo.title}}</h3>
        <aside v-if="!!headerInfo.right" @click="rightHandle">
        <Icon :name="headerInfo.right"></Icon>
        </aside>
        <div v-else></div>
        <Popup :show="show"></Popup>
    </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
// import { Popup } from 'vant';

import { HeaderInfo, PageInfo } from '@/store/state';
import Icon from './common/Icon/HeaderIcon';
import Popup from './common/Popup/Popup.vue';

@Component({
    components: {
        Icon,
        Popup,
    },
})
export default class Header extends Vue {

    @State private headerInfo: HeaderInfo;

    private show: boolean;

    // private leftHandle() {
    //     const { left } = this.headerInfo;
    //     switch (left) {
    //         case value:

    //             break;

    //         default:
    //             break;
    //     }
    // }
    private rightHandle() {
        const right = this.headerInfo.right;

        switch (right) {
            case 'new':
            this.newHabit();
            break;

            default:
                break;
        }
    }

    private newHabit() {
        this.show = true;
    }

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

.van-popup {
    width: 100%;
    height: 100%;
}

</style>

