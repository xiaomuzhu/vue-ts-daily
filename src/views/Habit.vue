<template>
  <div class="habit">
    <List v-for="item in habitList" :key="item.id" :color="item.color"  :habitLog="item.habitLog" :habitInfo="item.habitInfo" :iconName="item.iconName">
    </List>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { State } from 'vuex-class';

import { HabitList as HabitListState } from '@/store/state';

import List from '@/components/common/HabitList/List.vue'; // @ is an alias to /src

@Component({
  components: {
    List,
  },
})
export default class Habit extends Vue {
    @State private habitList: HabitListState[];

// public mounted() {
//   console.log(this.habitList);

// }
}

</script>
<style lang="scss" scoped>
@import '../style/mixin';

.habit {
  width: 100%;
  height: calc(100vh - 7rem);
  dispaly: flex;
  justify-content: flex-start;
  flex-direction: column;
}

</style>

