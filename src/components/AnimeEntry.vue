<template>
  <div class="wrapper m-2">
    <div class="container flex flex-start relative h-28 w-full bg-zinc-100 dark:bg-slate-800 shadow-md rounded-md">
      <!-- status indicator -->
      <div class="h-full w-2 rounded-tl-md rounded-bl-md" :class="statusColor"></div>
      <img class="object-contain" :src="entryPicture"/>

      <!-- Main info -->
      <div class="ml-4 mt-1 truncate">
        <h3 class="truncate"><b>{{ entryTitle }}</b></h3>
        <h4 v-if="entryTitle !== entryAltTitle" class="truncate text-sm">{{ entryAltTitle.substring(0, 40) }}</h4>
        <p class="text-xs">Mean: <b>{{ entryMean }}</b></p>
        <p class="text-xs">Score: <b>{{ entryScore }}</b></p>
        <div class="max-w-sm bottom-1 absolute">
          <input type="range" min="0" max="10" :value="entryScore" class="range range-xs" step="1" />
        </div>
      </div>

      <!-- RHS -->
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="fill-red-600 absolute right-3 top-1"><path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path></svg>
      <input type="text" :placeholder="episodesWatched + '/' + entryEpisodes" class="input input-bordered rounded-md input-xs w-20 max-w-xs absolute right-3 top-10" />
      <select class="select select-sm w-36 text-xs max-w-xs absolute bottom-1 right-3">
        <option v-for="option in status_options" :key="option" :selected="option.id === entryStatus">{{ option.name }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      status_options: [
        {id: 'completed', name: 'Completed'},
        {id: 'watching', name: 'Watching'},
        {id: 'on_hold', name: 'On Hold'},
        {id: 'dropped', name: 'Dropped'},
        {id: 'plan_to_watch', name: 'Plan to Watch'},
      ],
    };
  },

  props: [
    'entryPicture',
    'entryStatus',
    'entryTitle',
    'entryAltTitle',
    'entryMean',
    'entryScore',
    'entryEpisodes',
    'episodesWatched',
  ],

  computed: {
    statusColor() {
      return { 
        'bg-green-500': this.entryStatus === 'watching',
        'bg-red-600': this.entryStatus === 'dropped',
        'bg-blue-700': this.entryStatus === 'completed',  
        'bg-yellow-400': this.entryStatus === 'on_hold',
        'bg-gray-400': this.entryStatus === 'plan_to_watch',
      };
    },

    methods: {
      updateEntry(){
        // TODO: call function in MAL.js to send PUT for animelist
      }
    },
  },
}
</script>

<style scoped>
  
</style>