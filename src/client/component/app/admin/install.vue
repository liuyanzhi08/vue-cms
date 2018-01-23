<template>
    <div>
        <div v-if="!resolved">
            installing db...
        </div>
        <div v-if="resolved && !error">
            db installed.
        </div>
        <div v-if="error">
            <pre>{{error}}</pre>
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
                resolved: 0,
                error: null
            }
        },
        methods: {
        },
        created: function () {
            var _this = this;
            Install.get().then(function (res) {
                _this.resolved = 1
                var data = res.data
                if (data.errno) {
                    _this.error = data
                } else {
                    installer.set()
                    router.push({ name: 'root'})
                }
            })
        },
        components: {
        }
    }
</script>
<style lang="scss">

</style>