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

  <anime-entry v-for="entry in animelist" :key="entry"
    :entry-picture="entry.node.main_picture.medium"
    :entry-status="entry.node.my_list_status.status"
    :entry-title="entry.node.title"
    :entry-alt-title="entry.node.alternative_titles.en"
    :entry-mean="entry.node.mean"
    :entry-score="entry.node.my_list_status.score"
    :entry-episodes="entry.node.num_episodes"
    :episodes-watched="entry.node.my_list_status.num_episodes_watched"
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
    this.animelist = await this.mal.getAnimeList();
  },

  methods: {
    getUserData(){
      const userdata = this.mal.getUser();
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
