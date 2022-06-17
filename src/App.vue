<template>
  <nav-bar
  :avatar="userdata.picture"
  ></nav-bar>
</template>

<script>
import * as browser from 'webextension-polyfill';

export default {
  name: 'App',
  data(){
    return {
      userdata: null,
    };
  },

  async mounted(){
    await this.getUserData();
  },

  methods: {
    async getUserData(){
      browser.storage.local.get('userdata').then(res => {
        this.userdata = res.userdata;
      })
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
