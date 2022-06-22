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
    this.getUserData();
    await this.loadUserAnimeList();
  },

  methods: {
    getUserData(){
      const userdata = JSON.parse(localStorage.getItem('userdata'));
      // use this as example content
      if (userdata) {
        this.userdata = userdata;
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
    },

    async loadUserAnimeList(){
      const args = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ` // make this hidden
        }
      }

      try {
        const response = await fetch('https://api.myanimelist.net/v2/users/@me/animelist?fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics&limit=1000', args)
        const animelist = await response.json();
        this.animelist = animelist.data;
      } catch (e) {
        console.log(e);
      }
    }
  },
}
</script>
