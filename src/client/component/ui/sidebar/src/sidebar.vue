<template>
    <div class="ui-sidebar">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'ui-sidebar',
        props: {
        },
        data: function () {
            return {
                collapsed: true
            }
        },
        methods: {
        },
        created: function () {
        },
        mounted: function () {
            let width = 300
            let $side = $(this.$el.children[0])
            let $main = $(this.$el.children[1])
            let $document = $(document)
            $side
                .addClass('side')
                .css({
                   width: width
                })
            $main
                .addClass('main')
                .css({
                    paddingLeft: width
                })
            let mouseDown = false
            let lastCursorX
            $document.mousemove(e => {
                let cursorX = e.clientX
                if (mouseDown) {
                    let offset = cursorX - lastCursorX
                    $side.css('width', '+=' + offset)
                    $main.css('paddingLeft', '+=' + offset)
                }
                lastCursorX = cursorX

            })

            $side.mousedown(e => {
                let sideRect = $side[0].getBoundingClientRect()
                let cursorX = e.clientX
                let edgeX = sideRect.left + sideRect.width
                if (isNearEdge(cursorX, edgeX)) {
                    mouseDown = true
                }
            })
            $document.mouseup(() => {
                mouseDown = false
            })

            function isNearEdge (cursorX, edgeX) {
                let threshold = 20
                let leftEdge = edgeX - threshold
                let rightEdge = edgeX
                if (cursorX > leftEdge && cursorX < rightEdge) {
                    return true
                } else {
                    return false
                }
            }
            console.log($side[0].getBoundingClientRect())
        }
    }
</script>
<style lang="scss">
    .ui-sidebar {
        .side {
            position: absolute;
            min-height: 100%;
            border-right: 1px solid #c9c9c9;
            white-space: nowrap;
            overflow: hidden;
            &:after {
                font: normal normal normal 14px/1 FontAwesome;
                content: '\f104';
                display: block;
                color: #c9c9c9;
                position: absolute;
                top: 0;
                right: 0;
                width: 20px;
                height: 100%;
                cursor: move;
                 display: flex;
                 align-items: center;
                 justify-content: center;
            }
        }
    }
</style>