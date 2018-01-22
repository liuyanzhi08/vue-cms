import Vue from 'vue'
import path from 'path'

export default {
    get: function () {
        return Vue.http.get(path.join('/api/install'))
    }
}