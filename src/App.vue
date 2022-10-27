<template>
  <nav-bar
    :avatar="(userdata ? userdata.picture : 'https://c.tenor.com/2rPXdvoBu6IAAAAd/moyai-moyai-emoji.gif')"
  ></nav-bar>

  <alert-box 
    :message="message"
    :show="showBox"
    mode="error"
    :fixed="true"
    @close="closeAlertBox"
  ></alert-box>

  <router-view></router-view>
</template>

<script>
/* eslint-disable */
import { themeChange } from 'theme-change';

export default {
  name: 'App',
  
  data(){
    return {
      userdata: null,
      showBox: false,
      message: '',
    };
  },

  mounted() {
    themeChange(false);
    this.mal.refreshTokenIfNeeded();
    this.getUserData();
  },

  methods: {
    async getUserData(){
      const userdata = await this.mal.getUser();
      if (!userdata) {
        this.openAlertBox('Please log in again...');
       setTimeout(() => browser.runtime.reload(), 1500)
        return;
      }

      this.userdata = userdata;
    },

    openAlertBox(message = 'Unexpected 500'){
      this.showBox = true;
      this.message = message;
    },

    closeAlertBox(){
      this.showBox = false;
    },
  },
}
</script>
