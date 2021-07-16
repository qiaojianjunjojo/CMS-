<template>
    <div>
        <!-- 文章列表 -->
        <div class="article-list">
            <row type="flex" justify="space-around" class="code-row-bg">
                <i-col span="24">
                    <ArticleList :list="list" :title="listTitle" class="listitem" />
                </i-col>
            </row>
        </div>
    </div>
</template>

<script>
import ArticleList from "@/components/articleList.vue";

export default {
    name: "Articles",
    components: { ArticleList },

    data() {
        return {
            list: [],
            listTitle: "文章总览"
        };
    },

    created() {
        this.$api.get("getNewArticle").then(res => {
            let tdata = [];
            res.data.map(item => {
                item.id && tdata.push(item);
            });
            this.list = tdata;
        });
    },

    methods: {}
};
</script>

<style  scoped>
.listitem{
    padding: 10px;
    font-size: 18px;
    background-color: rgb(238, 243, 235);
}
</style>