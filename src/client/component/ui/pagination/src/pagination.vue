<template>
    <nav
        v-if="pagination"
        aria-label="Page navigation"
    >
        <ul class="ui-pagination pagination">
            <li :class="{ disabled: pagination.isDisabled(pagination.prev()) }">
                <a :href="pagination.prev().url" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li
                v-for="item in pagination.pages()"
                :class="{
                    active: pagination.isCur(item),
                    disabled: pagination.isDisabled(item)
                }"
                ><a :href="item.url">
                {{item.page}}</a>
            </li>
            <li :class="{ disabled: pagination.isDisabled(pagination.next()) }">
                <a :href="pagination.next().url" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>
<script>
    class Pagigation {
        constructor (page, num, total, router) {
            this.page = page
            this.num = num
            this.total = total
            this.max = Math.ceil(total / num)
            this.min = 1
            this.router = router
        }
        pages () {
            let pages = []
            // get 5 pages in a row which contain the cur page
            let start = this.page - 2
            if (start < this.min) {
                start = this.min
            }
            let end = start + 4
            if (end > this.max) {
                start -= (end - this.max)
                if (start < this.min) {
                    start = this.min
                }
                end = this.max
            }
            while (start <= end) {
                let isCur = start === this.page
                pages.push({
                    page: start,
                    url: isCur ? 'javascript:;' : this.url(start),
                    disabled: isCur
                })
                start++
            }
            // prepend pages
            let head = pages[0]
            if (head) {
                if (head.page - this.min  >= 4) {
                    pages.splice(0, 0, {
                        page: 1,
                        url: this.url(1)
                    }, {
                        page: 2,
                        url: this.url(2)
                    }, {
                        page: '...',
                        url: 'javascript:;'
                    })
                } else {
                    for (let i = head.page - 1; i >= 1; i--) {
                        pages.unshift({
                            page: i,
                            url: this.url(i)
                        })
                    }
                }
            }
            // append pages
            let len = pages.length
            let tail = pages[len - 1]
            if (tail) {
                if (this.max - tail.page >= 4) {
                    pages.splice(len, 0, {
                        page: '...',
                        url: 'javascript:;'
                    }, {
                        page: this.max - 1,
                        url: this.url(this.max - 1)
                    }, {
                        page: this.max,
                        url: this.url(this.max)
                    })
                } else {
                    for (let i = tail.page + 1; i <= this.max; i++) {
                        pages.push({
                            page: i,
                            url: this.url(i)
                        })
                    }
                }
            }
            return pages
        }
        prev () {
            let page = this.page - 1
            let disabled
            if (page < this.min) {
                page = this.min
                disabled = true
            }
            return {
                page: page,
                url: disabled ? 'javascript:;' : this.url(page),
                disabled: disabled
            }
        }
        next () {
            let page = this.page + 1
            let disabled
            if (page > this.max) {
                page = this.max
                disabled = true
            }
            return {
                page: page,
                url: disabled ? 'javascript:;' : this.url(page),
                disabled: disabled
            }
        }
        isCur (pageInfo) {
            return this.page === pageInfo.page
        }
        isDisabled (pageInfo) {
            return pageInfo.disabled
        }
        url (page) {
            return this.router && this.router.resolve({
                name: this.router.name,
                query: { _page: page, _num: this.num }
            }).href
        }
        go (page) {
            this.page = page
        }
    }
    export default {
        name: 'ui-pagination',
        props: {
            page: {
                type: Number,
                default: null
            },
            total: Number
        },
        data: function () {
            return {
                pagination: null
            }
        },
        methods: {
        },
        created: function () {
            let me = this
            this.$watch('page', (newVal, oldVal) => {
                this.pagination = new Pagigation(newVal, 10, this.total, this.$router)
            })
        }
    }
</script>
<style lang="scss">
    .ui-pagination > .disabled > a,
    .ui-pagination > .disabled > a:hover,
    .ui-pagination > .disabled > a:focus {
        cursor: default;
    }

    .ui-pagination > .active > a, .ui-pagination > .active > a:hover, .ui-pagination > .active > a:focus,
    .ui-pagination > .active > span,
    .ui-pagination > .active > span:hover,
    .ui-pagination > .active > span:focus {
        color: #fff !important;
        background-color: #337ab7 !important;
        border-color: #337ab7 !important;
    }
</style>