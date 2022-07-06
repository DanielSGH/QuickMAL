<template>
  <alert-box
    message="Invalid input!"
    :show="showBox"
    mode="error"
    :fixed="false"
    @close="closeAlertBox"
  ></alert-box>


  <div class="wrapper m-2">
    <div class="container flex flex-start relative h-28 w-full bg-zinc-100 dark:bg-slate-800 shadow-md rounded-md">
      <!-- status indicator -->
      <div class="h-full w-2 rounded-tl-md rounded-bl-md" :class="statusColor"></div>
      <img class="object-contain" :src="mutableNode.main_picture.medium"/>

      <!-- Main info -->
      <div class="ml-4 mt-1 truncate">
        <h3 class="truncate"><b>{{ computedTitle }}</b></h3>
        <h4 v-if="mutableNode.title !== mutableNode.alternative_titles.en" class="truncate text-sm">{{ computedAltTitle }}</h4>
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
        <option v-for="option in mal.getStatusOptions()" :key="option" :value="option.id" :selected="option.id === mutableNode.my_list_status.status">{{ option.name }}</option>
      </select>
    </div>
  </div>
</template>

<script>
import AlertBox from './AlertBox.vue';
export default {
  components: { AlertBox },
  props: [
    'node',
  ],
  emits: [
    'listChange'
  ],

  data(){
    return {
      mutableNode: this.node,
      inputValue: '',
      showBox: false,
    };
  },

  methods: {
    async updateAnimeList(){
      if ((+this.inputValue > this.mutableNode.num_episodes) || (+this.inputValue < 0))
        return this.openAlertBox(); // launch non-fixed popup

      if (+this.inputValue === this.mutableNode.num_episodes)
        this.mutableNode.my_list_status.status = 'completed';
      
      this.mutableNode.my_list_status.num_episodes_watched = this.inputValue || this.mutableNode.my_list_status.num_episodes_watched;

      for (let [key] of Object.entries(this.$refs))
        this.$refs[key].blur()

      await this.mal.updateAnimeList(this.mutableNode);
      this.$emit('listChange');
    },

    openAlertBox(){
      this.showBox = true;
    },

    closeAlertBox(){
      this.showBox = false;
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

    computedTitle() {
      return this.mutableNode.title.length > 35 ? this.mutableNode.title.substring(0,35) + '...' : this.mutableNode.title;
    },

    computedAltTitle(){
      return this.mutableNode.alternative_titles.en.length > 40 ? this.mutableNode.alternative_titles.en.substring(0, 37) + '...' : this.mutableNode.alternative_titles.en;
    }
  },
}
</script>

<style scoped>
  
</style>