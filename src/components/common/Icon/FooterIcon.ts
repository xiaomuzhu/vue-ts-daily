import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import { Mutation } from 'vuex-class';

import { PageInfo } from '@/store/state';
import template from './Icon.vue';

@Component({
  name: 'FooterIcon',
  mixins: [template],
})
export default class FooterIcon extends Vue {
  @Prop() private name!: object;
  @Prop() private path!: string;
  @Prop() private id!: number;
  @Prop() private isActived!: boolean;
  @Prop() private tagName!: string;
  @Mutation private getActivePage!: (pageName: number) => void;
  @Mutation private changeHeaderState!: (pageName: number) => void;

  private changeActivePage() {
    const id = this.id;

    if (!this.isActived) {
      this.getActivePage(id);
      this.changeHeaderState(id);
    }
  }
}
