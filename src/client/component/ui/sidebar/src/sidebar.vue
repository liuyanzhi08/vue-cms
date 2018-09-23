<template>
  <div class="ui-sidebar">
    <slot />
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
    const width = 300;
    const $side = $(this.$el.children[0]);
    const $main = $(this.$el.children[1]);
    const $document = $(document);
    $side
      .addClass('side')
      .css({
        width,
      });
    $main
      .addClass('main');
    let mouseDown = false;
    let lastCursorX;
    $document.mousemove((e) => {
      const cursorX = e.clientX;
      if (mouseDown) {
        const offset = cursorX - lastCursorX;
        $side.css('width', `+=${offset}`);
        // $main.css('marginLeft', '+=' + offset)
      }
      lastCursorX = cursorX;
      return false;
    });

    $side.mousedown((e) => {
      const sideRect = $side[0].getBoundingClientRect();
      const cursorX = e.clientX;
      const edgeX = sideRect.left + sideRect.width;
      if (isNearEdge(cursorX, edgeX)) {
        mouseDown = true;
      }
    });
    $document.mouseup(() => {
      mouseDown = false;
    });
  },
  methods: {},
};

</script>
<style lang="scss">
  .ui-sidebar {
    display: flex;
    .side {
      flex-shrink: 0;
      position: relative;
      min-height: 100%;
      border-right: 1px solid #c9c9c9;
      white-space: nowrap;
      overflow: hidden;
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
      width: 100%;
    }
  }
</style>
