<template>
  <anime-entry v-for="entry in filteredlist" :key="entry"
    :node="entry.node"
  ></anime-entry>
</template>

<script>
import AnimeEntry from '../components/AnimeEntry.vue';

export default {
  components: {
    AnimeEntry,
  },

  data(){
    return {
      animelist: null,
      filteredlist: null,
    };
  },
  
  async mounted() {
    this.animelist = await this.mal.getAnimeList();
    this.filterList();
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
      if (filter === 'all') {
        this.filteredlist = this.animelist;
        return;
      }
        
      this.filteredlist = this.animelist.filter(entry => entry.node.my_list_status.status === filter);
    }
  }
  
}
</script>

<style>

</style>