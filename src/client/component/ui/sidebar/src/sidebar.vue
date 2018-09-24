<template>
  <div
    class="ui-sidebar"
  >
    <div class="side">
      <slot name="side" />
    </div>
    <div class="main">
      <slot name="main" />
    </div>
  </div>
</template>
<script>
const isNearEdge = (cursorX, edgeX) => {
  const threshold = 20;
  const leftEdge = edgeX - threshold;
  const rightEdge = edgeX;
  if (cursorX > leftEdge && cursorX < rightEdge) {
    return true;
  }
  return false;
};

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
    const sidebarWidth = 300;
    const $side = $(this.$el.children[0]);
    const $main = $(this.$el.children[1]);
    const $doc = $(document);

    $win.resize(() => {
      if ($win.width() < 960) {
        $side.css({ width: '100%' });
        $main.css({ left: 0 });
        return;
      }
      $side.css({ width: sidebarWidth });
      $main.css({ left: sidebarWidth });
    });

    if ($win.width() < 960) {
      $side.css({ width: 'auto' });
      $main.css({ left: 0 });
      return;
    }

    $side.css({ width: sidebarWidth });
    $main.css({ left: sidebarWidth });

    let mouseDown = false;
    let lastCursorX;
    const mousedown = (e) => {
      const cursorX = e.clientX;
      if (mouseDown) {
        const offset = cursorX - lastCursorX;
        $side.css('width', `+=${offset}`);
        $main.css('left', `+=${offset}`);
      }
      lastCursorX = cursorX;
      return false;
    };
    $doc.mousemove(mousedown);

    $side.mousedown((e) => {
      const sideRect = $side[0].getBoundingClientRect();
      const cursorX = e.clientX;
      const edgeX = sideRect.left + sideRect.width;
      if (isNearEdge(cursorX, edgeX)) {
        mouseDown = true;
      }
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
      overflow-x: hidden;
      overflow-y: auto;
      overflow-scrolling: touch;
      padding: 15px 0 10px 10px;
      &:after {
        font: normal normal normal 14px/1 FontAwesome;
        content: '\f104';
        display: flex;
        color: #c9c9c9;
        position: absolute;
        top: 0;
        right: 0;
        width: 20px;
        height: 100%;
        cursor: col-resize;
        align-items: center;
        justify-content: center;
      }
    }
    .main {
      position: absolute;
      right: 0;
      padding: 20px 20px 20px 30px;
    }
  }
  @media (max-width: 960px) {
    .ui-sidebar {
      .side {
        position: static;
        box-shadow: 0 5px 15px rgba(0,0,0,0.08);
        bottom: auto;
        &:after {
          display: none;
        }
      }
      .main {
        position: static;
        padding: 30px 20px 20px 20px;
      }
    }
  }
</style>
