import { createRouter, createWebHistory } from 'vue-router'
import IndexView from "@/views/giftcard/IndexView.vue";
import EditorView from "@/views/giftcard/EditorView.vue";
import ContactView from "@/views/giftcard/ContactView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
      meta: { title: 'Repülőjegy utalvány - repjegy.hu' }
    },
    {
      path: '/utalvany',
      name: 'utalvany_index',
      component: IndexView,
      meta: { title: 'Repülőjegy utalvány - repjegy.hu' }
    },
    {
      path: '/utalvany/szerkeszto',
      name: 'utalvany_szerkeszto',
      component: EditorView,
      meta: { title: 'Repülőjegy utalvány - repjegy.hu' }
    },
    {
      path: '/utalvany/kapcsolat',
      name: 'utalvany_kapcsolat',
      component: ContactView,
      meta: { title: 'Repülőjegy utalvány - repjegy.hu' }
      
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router
