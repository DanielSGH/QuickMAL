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

  <anime-entry v-for="entry in animelist" :key="entry"
    :node="entry.node"
  ></anime-entry>
</template>

<script>
import { themeChange } from 'theme-change';
import AnimeEntry from './components/AnimeEntry.vue';

export default {
  name: 'App',
  components: {
    AnimeEntry,
  },

  data(){
    return {
      userdata: null,
      showBox: false,
      message: '',
      animelist: null,
    };
  },

  async mounted(){
    themeChange(false);
    this.mal.refreshTokenIfNeeded(); // no need to await, refreshing token can happen in background
    this.getUserData();
    this.animelist = await this.mal.getAnimeList(); // check for error getting animelist
  },

  methods: {
    async getUserData(){
      const userdata = await this.mal.getUser();
      if (!userdata)
        return this.openAlertBox('Failed to retrieve user data...');

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
