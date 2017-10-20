<template>
    <div>
        <transition name="fade">
            <div
                :class="{
                'ui-collapse': 1,
                'ui-collapse-collapsed': collapsed
            }"
                >
                <slot></slot>
            </div>
        </transition>
        <button
            v-if="collapsed"
            @click="toggle"
            class="btn btn-default"
        >阅读全文 <i class="fa fa-angle-down"></i></button>
    </div>
</template>
<script>
    export default {
        name: 'ui-collapse',
        props: {
            page: {
                type: Number,
                default: null
            },
            total: Number,
            tag: {
                type: String,
                default: 'div'
            },
        },
        data: function () {
            return {
                collapsed: true
            }
        },
        methods: {
            toggle() {
                this.collapsed = !this.collapsed
            }
        },
        created: function () {
        }
    }
</script>
<style lang="scss">
    .ui-collapse {
    }
    .ui-collapse-collapsed {
        max-height: 300px;
        overflow: hidden;
    }
</style>