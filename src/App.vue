<template>
  <nav-bar
  :avatar="(userdata ? userdata.picture : 'https://api.lorem.space/image/face?hash=33791')"
  ></nav-bar>
  <alert-box 
  :message="message"
  :show="showBox"
  mode="error"
  :fixed="true"
  @close="closeAlertBox"
  ></alert-box>
</template>

<script>
import * as browser from 'webextension-polyfill';
import { themeChange } from 'theme-change';

export default {
  name: 'App',
  data(){
    return {
      userdata: null,
      showBox: false,
      message: null,
    };
  },

  async mounted(){
    themeChange(false);
    await this.getUserData();
  },

  methods: {
    async getUserData(){
      const response = await browser.storage.local.get('userdat');
      if (response.userdata) {
        this.userdata = response.userdata;
        return;
      }

      this.openAlertBox('Failed to retrieve user data...');
    },

    openAlertBox(message){
      this.showBox = true;
      this.message = message;
    },

    closeAlertBox(){
      this.showBox = false;
    }
  },
}
</script>
