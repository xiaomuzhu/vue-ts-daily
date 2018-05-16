<template>
    <footer>
        <Icon v-for="item in activePage" :key="item.id" :tagName="item.tagName" :isActived="item.isActived" :id="item.id" :name="item.name" :path="item.path" >
        </Icon>
    </footer>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { State } from 'vuex-class';

import { PageInfo } from '@/store/state';
import Icon from './common/Icon/FooterIcon';

@Component({
  components: {
    Icon,
  },
})
export default class Footer extends Vue {
  @State private activePage!: PageInfo[];
}
</script>

<style lang="scss" scoped>
@import '../style/mixin';

footer {
  width: 100%;
  height: 3.5rem;
  min-height: 8%;
  background-color: $grey;
  display: flex;
  align-items: center;
  justify-content: space-around;
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-size: 60%;
    svg {
      margin-bottom: 0.4rem;
    }
  }
}
</style>
