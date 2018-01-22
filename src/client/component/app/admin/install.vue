<template>
    <div>
        <div v-if="state === 0">
            installing db...
        </div>
        <div v-if="state === 1">
            db installed.
        </div>
    </div>
</template>
<script>
    import Install from '../../../api/install'
    import router from '../../../router'
    import installer from '../../../helper/installer'

    export default {
        data: function () {
            return {
                state: 0
            }
        },
        methods: {
        },
        created: function () {
            var _this = this;
            Install.get().then(function (res) {
                _this.state = 1
                installer.set()
                router.push({ name: 'root'})
            })
        },
        components: {
        }
    }
</script>
<style lang="scss">

</style>