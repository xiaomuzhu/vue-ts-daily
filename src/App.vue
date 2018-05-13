<template>
  <main id="app">
    <div v-if="$route.meta.main">
      <Header></Header>
        <router-view />  
      <Footer></Footer>
    </div>
    <div v-if="!$route.meta.main">
    <router-view />
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
@Component({
  components: {
    Header,
    Footer,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
@import './style/mixin';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $font;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: space-between;
  max-width: 100vw;
  height: 100vh;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: $font;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
  .fade-leave-to
  /* .fade-leave-active below version 2.1.8 */
 {
  opacity: 0;
}
</style>
