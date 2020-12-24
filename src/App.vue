<template>
  <div id="main-app">
    <h1 @click="changeGl">changeGl</h1>
    <router-link to="/home">Home</router-link>
    <router-link to="/app1">About</router-link>
    <router-view v-show="$route.name"/>
    <div id="content" v-show="!$route.name"></div>
  </div>
</template>

<script>
  export default {
    methods: {
      changeGl() {
        this.$setGlobalState({
          userName: 'aa'
        });
      }
    }
  };
</script>

<style scoped lang="scss">
</style>
