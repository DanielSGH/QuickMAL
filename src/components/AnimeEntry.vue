<template>
  <div class="wrapper m-2">
    <div class="container flex flex-start relative h-28 w-full bg-zinc-100 dark:bg-slate-800 shadow-md rounded-md">
      <!-- status indicator -->
      <div class="h-full w-2 rounded-tl-md rounded-bl-md" :class="statusColor"></div>
      <img class="object-contain" :src="mutableNode.main_picture.medium"/>

      <!-- Main info -->
      <div class="ml-4 mt-1 truncate">
        <h3 class="truncate"><b>{{ mutableNode.title }}</b></h3>
        <h4 v-if="mutableNode.title !== mutableNode.alternative_titles.en" class="truncate text-sm">{{ mutableNode.alternative_titles.en.substring(0, 40) }}</h4>
        <p class="text-xs">Mean: <b>{{ mutableNode.mean }}</b></p>
        <p class="text-xs">Score: <b>{{ mutableNode.my_list_status.score }}</b></p>
        <div class="max-w-sm bottom-1 absolute">
          <input type="range" min="0" max="10" v-model="mutableNode.my_list_status.score" @change="updateAnimeList" class="range range-xs" step="1" />
        </div>
      </div>

      <!-- RHS -->
      <svg @click="mal.deleteEntry(mutableNode.id)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="fill-red-600 absolute right-3 top-3 cursor-pointer">
        <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path>
      </svg>

      <input type="text"
        tabindex="0"
        ref="episodes"
        @focus="inputValue = mutableNode.my_list_status.num_episodes_watched"
        @focusout="inputValue = ''"
        @keydown.enter="updateAnimeList"
        v-model="inputValue"
        :placeholder="mutableNode.my_list_status.num_episodes_watched + '/' + mutableNode.num_episodes" 
        class="input input-bordered input-sm rounded-md w-20 max-w-xs absolute top-10 right-3" 
      />

      <select v-model="mutableNode.my_list_status.status" @change="updateAnimeList" ref="status" class="select select-sm w-36 text-xs max-w-xs absolute bottom-1 right-3">
        <option v-for="option in status_options" :key="option" :value="option.id" :selected="option.id === mutableNode.my_list_status.status">{{ option.name }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'node',
  ],

  data(){
    return {
      status_options: [
        {id: 'completed', name: 'Completed'},
        {id: 'watching', name: 'Watching'},
        {id: 'on_hold', name: 'On Hold'},
        {id: 'dropped', name: 'Dropped'},
        {id: 'plan_to_watch', name: 'Plan to Watch'},
      ],
      mutableNode: this.node,
      inputValue: '',
    };
  },

  methods: {
    async updateAnimeList(){
      for (let [key] of Object.entries(this.$refs))
        this.$refs[key].blur()

      this.mutableNode.my_list_status.num_episodes_watched = this.inputValue || this.mutableNode.my_list_status.num_episodes_watched;
      await this.mal.updateAnimeList(this.mutableNode);
    }
  },

  computed: {
    statusColor() {
      return { 
        'bg-green-500': this.mutableNode.my_list_status.status === 'watching',
        'bg-red-600': this.mutableNode.my_list_status.status === 'dropped',
        'bg-blue-700': this.mutableNode.my_list_status.status === 'completed',  
        'bg-yellow-400': this.mutableNode.my_list_status.status === 'on_hold',
        'bg-gray-400': this.mutableNode.my_list_status.status === 'plan_to_watch',
      };
    },
  },
}
</script>

<style scoped>
  
</style>