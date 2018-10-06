<template>
  <div id="app">
    <div>test 1234</div>
    <router-view class="uk-offcanvas-content" />
  </div>
</template>
<script>

export default {
  async mounted() {
    const UIkit = await import('uikit');
    const Icons = await import('uikit/dist/js/uikit-icons');
    UIkit.use(Icons.default);
  },
};
</script>
<style lang="scss" src="@style/theme-uikit/index.scss" />
<style lang="scss" src="@style/theme-mavon-editor/index.scss" />
<style lang="scss" src="@style/theme-element-ui/index.scss" />
<style lang="scss" src="@style/google-font/index.scss" />
