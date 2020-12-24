<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1 @click="changeUserName1">changeUserName1</h1>
    <h1 @click="changeUserName2">changeUserName2</h1>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    methods: {
      changeUserName1() {
        this.$setGlobalState({
          userName: 'aa'
        });
      },
      changeUserName2() {
        this.$setGlobalState({
          userName: 'bb',
          name: 'cc'
        });
      }
    }
  };
</script>
