<template>
  <loading
    v-model:active="isLoading"
    :can-cancel="false"
    loader="dots"
    opacity="0"
    color="gray"
  ></loading>
  <anime-entry v-for="entry in filteredlist" :key="entry"
    @listChange="filterList"
    :node="entry.node"
  ></anime-entry>
</template>

<script>
import AnimeEntry from '../components/AnimeEntry.vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  components: {
    AnimeEntry,
    Loading,
  },

  data(){
    return {
      animelist: null,
      filteredlist: null,
      isLoading: false,
    };
  },
  
  async mounted() {
    await this.getListAndFilter();
  },

  watch: {
    '$route.params.filter': {
      handler: function() {
        this.filterList();
      },
      deep: true,
      immediate: true,
    }
  },

  methods: {
    filterList(filter = this.$route.params.filter) {
      if (!this.animelist) return;

      if (filter === 'all') {
        this.filteredlist = this.animelist;
        return;
      }
        
      this.filteredlist = this.animelist.filter(entry => entry.node.my_list_status.status === filter);
      if (this.filteredlist.length === 0)
        this.$router.replace('/animelist/completed');
    },

    async getListAndFilter() {
      this.isLoading = true;
      
      this.animelist = await this.mal.getAnimeList();
      this.filterList();

      this.isLoading = false;
    }
  }
}
</script>

<style>

</style>