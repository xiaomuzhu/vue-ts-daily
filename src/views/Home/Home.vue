<template>
  <div class="home">
    1
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'; // @ is an alias to /src

@Component({
  components: {
  },
})
export default class Home extends Vue {}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';

.home {
  height: calc(100vh - 7rem);
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

</style>
