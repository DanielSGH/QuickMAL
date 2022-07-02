<template>
  <Teleport to="body">
    <div v-if="show" class="modalalert m-4 fixed z-[999] top-[12%] left-1/2 w-[300px] ml-[-150px]">
      <div class="alert shadow-lg relative" :class="modes">
        <div>
          <svg v-if="mode === 'info'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <svg v-if="mode === 'success'" xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <svg v-if="mode === 'warning'" xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <svg v-if="mode === 'error'" xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{{ mode === 'error' ? 'Error! ' : '' }}{{ message }}</span>
          <button v-if="!fixed" class="absolute right-4 font-bold" @click="tryClose">X</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
    mode: {
      type: String,
      required: false,
    },
    fixed: {
      type: Boolean,
      required: true,
    }
  },
  emits: ['close'],

  computed: {
    // I'm really sad this doesn't work...
    // alertType(){
    //   return 'alert alert-' + this.mode + ' shadow-lg';
    // },

    modes(){
      return { 'alert-info': this.mode === 'info', 'alert-success': this.mode === 'success', 'alert-warning': this.mode === 'warning', 'alert-error': this.mode === 'error' };
    }
  },

  methods: {
    tryClose(){
      if (this.fixed)
        return;
      
      this.$emit('close');
    },
  }
}
</script>

<style scoped>

</style>