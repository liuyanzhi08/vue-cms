<template>
    <div>
        <slot
            name="item"
            v-for="item in items"
            :id="item.id"
            :title="item.title"
            :content="item.content"
            :category_id="item.category_id"
            :create_time="item.create_time"
        >
            <!-- 这里写入备用内容 -->
        </slot>
    </div>
</template>
<script>
    import Article from '../../../../api/article'
    export default {
        name: 's-list',
        props: {
            cid: {
                type: String,
                default: '0'
            },
            limit: {
                type: String,
                default: '0, 10'
            }
        },
        data: function () {
            return {
                items: []
            }
        },
        created: function () {
            let [from, size] = this.limit.split(',')
            console.log(from, size)
            Article.get({
                _from: from,
                _size: size,
                category_id: this.cid
            }).then((res) => {
                console.log(res.data.items)
                this.items = res.data.items;
            })
        }
    }
</script>
<style lang="scss">
</style>