<template>
    <figure>
        <!-- <img :src="`https://picsum.photos/400/400/?image=${id}`" alt="An awesome picture">	 -->
        <img src="https://picsum.photos/200/300/?random" />
        <figcaption>{{saying}}</figcaption>
        <div class="footer"><div>日常</div><div></div>{{date}}</div>
    </figure>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import moment from 'moment';
moment.locale('zh-cn');
@Component({})
export default class Card extends Vue {
  @Prop() private saying!: string;
  @Prop() private id!: number;
  private data() {
    return {
      date: moment().format('MMMM Do YYYY a'),
    };
  }
}
</script>

<style lang="scss" scoped>
@import '../../../style/mixin';
figure {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  box-shadow: 2px 2px 5px #b4b0b0d8;
  @include font(0.8rem);
  img {
    width: 100%;
    height: 12rem;
  }
  figcaption {
    height: 8rem;
    margin: 1rem 0;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .footer {
    @include font(0.5rem);
    color: #b4b0b0d8;
    padding: 0 1rem;
    height: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
