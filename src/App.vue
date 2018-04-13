<template>
  <main id="app">
    <Header></Header>
    <content>
      <router-view />
    </content>
    <Footer></Footer>
  </main>
</template>

<script lang="ts">
  import {
    Component,
    Prop,
    Vue,
  } from 'vue-property-decorator';
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';
  @Component({
    components: {
      Header,
      Footer,
    },
  })
  export default class App extends Vue {
  }
</script>

<style lang="scss">
  @import './style/mixin';
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $font;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100vw;
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
</style>
