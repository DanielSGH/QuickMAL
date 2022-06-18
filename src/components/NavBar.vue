<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <a class="normal-case text-xl pl-2 font-bold" :class="{ 'text-white': isDark }">QuickMAL</a>
    </div>
    <div class="flex-none gap-2">
      <div class="form-control">
        <label class="label cursor-pointer">
          <input type="checkbox" class="toggle toggle-md" data-toggle-theme="dark,light" data-act-class="ACTIVECLASS" @click="toggleDark" :checked="isDark"/>
        </label>
      </div>
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img :src="avatar" />
          </div>
        </label>
        <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
          <li>
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    avatar: {
      type: String,
      required: true
    }
  },

  data(){
    return {
      isDark: false,
    };
  },

  mounted(){
    const theme = localStorage.getItem('theme');
    if (!theme)
      return;
    
    if (theme === 'dark')
      this.isDark = true;
  },

  methods: {
    toggleDark(){
      this.isDark = !this.isDark;
    }
  }
}
</script>

<style>

</style>