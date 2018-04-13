<template>
  <div class="habit">
    <List />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import List from '@/components/common/HabitList/List.vue'; // @ is an alias to /src

@Component({
  components: {
    List,
  },
})
export default class Home extends Vue {}

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

