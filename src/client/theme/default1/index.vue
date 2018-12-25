<template>
  <div>default index</div>
</template>
<script>
import md from '../../helper/md';
import { MENU_SET, MENU_TOGGLE } from '../../store';
// eslint-disable-next-line
import '@style/theme-default/index.scss';

export default {
  data() {
    return {
      md,
      collapsed: true,
      menu: [
        {
          label: 'Home',
          icon: 'home',
          router: {
            name: '',
            params: {},
          },
        },
        {
          label: 'About',
          icon: 'user',
          router: {
            name: '',
            params: {},
          },
        },
        {
          label: 'Archive',
          icon: 'user',
          router: {
            name: '',
            params: {},
          },
          children: [
            {
              label: 'Catalog',
              icon: 'list',
              router: {
                name: '',
                params: {},
              },
            },
            {
              label: 'Tag',
              icon: 'tag',
              router: {
                name: '',
                params: {},
              },
            },
          ],
        },
      ],
    };
  },
  async mounted() {
    const uk = await import('uikit');
    this.$store.dispatch(MENU_SET, uk.offcanvas('#offcanvas-nav'));
  },
  methods: {
    toggleMenu() {
      this.$store.dispatch(MENU_TOGGLE);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
