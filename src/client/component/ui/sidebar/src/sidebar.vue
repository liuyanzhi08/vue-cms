<template>
  <div
    class="ui-sidebar"
  >
    <div class="side">
      <slot name="side" />
      <div class="side-toggle uk-visible@m">
        <span uk-icon="icon: chevron-left" />
      </div>
    </div>
    <div class="main">
      <slot name="main" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'UiSidebar',
  props: {},
  data() {
    return {
      collapsed: true,
    };
  },
  created() {
  },
  mounted() {
    const $win = $(window);
    const $doc = $(document);
    const sidebarWidth = 300;
    const $side = $(this.$el.children[0]);
    const $main = $(this.$el.children[1]);
    const $toggle = $side.find('.side-toggle');

    const resize = () => {
      if ($win.width() < 960) {
        $side.css({ width: 'auto' });
        $main.css({ left: 0 });
      } else {
        $side.css({ width: sidebarWidth });
        $main.css({ left: sidebarWidth });
      }
    };

    resize();
    $win.resize(resize);

    let mouseDown = false;
    let lastCursorX;
    const mousedown = (e) => {
      const cursorX = e.clientX;
      if (mouseDown) {
        const offset = cursorX - lastCursorX;
        $side.css('width', `+=${offset}`);
        $main.css('left', `+=${offset}`);
        if (parseInt($main.css('left'), 10) < 0) {
          $main.css('left', 0);
        }
      }
      lastCursorX = cursorX;
      return false;
    };
    $doc.mousemove(mousedown);

    $toggle.mousedown(() => {
      mouseDown = true;
    });
    $doc.mouseup(() => {
      mouseDown = false;
    });
  },
  methods: {},
};

</script>
<style lang="scss">
  .ui-sidebar {
    position: relative;
    .side {
      position: fixed;
      top: 50px;
      left: 0;
      bottom: 0;
      background: white;
      border-right: 1px solid #e5e5e5;
      white-space: nowrap;
      overflow: visible;
      overflow-scrolling: touch;
      padding: 15px 0 10px 10px;
      .side-toggle {
        display: flex;
        align-items: center;
        color: #c9c9c9;
        position: absolute;
        top: 0;
        right: -10px;
        width: 20px;
        height: 100%;
        cursor: col-resize;
        .uk-icon {
          position: relative;
          left: -8px;
        }
      }
    }
    .main {
      position: absolute;
      background: white;
      right: 0;
      padding: 20px 20px 20px 0px;
      margin-left: 30px;
    }
  }
  @media (max-width: 960px) {
    .ui-sidebar {
      .side {
        position: static;
        box-shadow: 0 5px 15px rgba(0,0,0,0.08);
        bottom: auto;
      }
      .side-toggle {
        display: none;
      }
      .main {
        position: static;
        padding: 30px 20px 20px 0;
        margin-top: 10px;
        margin-left: 20px;
      }
    }
  }
</style>
