import storage from 'store'

export default {
    installed: storage.get('global.installed'),
    get: function () {
        return this.installed
    },
    set: function () {
        this.installed = true
        storage.set('global.installed', 1)
    }
}