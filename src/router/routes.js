const loadPage = component => 
  () => import(/* webpackChunkName:"[request]" */ `@/pages/${component}.vue`);

export default [
  { path: '/', redirect: '/index.html' }, // gets rid of the warning
  { path: '/index.html', redirect: '/animelist/watching' },
  { path: '/animelist/:filter', component: loadPage('AnimeList') },
]