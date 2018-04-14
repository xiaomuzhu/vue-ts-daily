import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import { Mutation } from 'vuex-class';

import { PageInfo } from '@/store/state';
import template from './Icon.vue';

@Component({
    name: 'HeaderIcon',
    mixins: [template],
})
export default class FooterIcon extends Vue {
    @Prop()
    private name: string;
    @Prop()
    private path: string;

    private data() {
        return {
            isTouched: false,
        };
    }
    // @Prop()
    // private path: string;
    // @Prop()
    // private id: number;
    // @Prop()
    // private isActived: boolean;
    // @Prop()
    // private tagName: string;
    // @Mutation private getActivePage: (pageName: number) => void

    // public changeIsTouched() {

    // }

    // private changeActivePage() {
    //     const id = this.id;

    //     if (!this.isActived) {
    //         this.getActivePage(id)
    //     }

    // }
}
