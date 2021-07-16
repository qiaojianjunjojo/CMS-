<template>
    <div>
        <h2>文章列表</h2>
        <div class="article-list">
            <row type="flex" justify="space-around" class="code-row-bg">
                <i-col span="24">
                    <ArticleList :list="list" :title="listTitle" />
                </i-col>
            </row>
        </div>
    </div>
</template>

<script>
import ArticleList from "@/components/articleList.vue";

export default {
    name: "Articletype",

    components: { ArticleList },

    data() {
        return {
            list: [],
            listTitle: ""
        };
    },

    created() {
        console.log(this.$route);
        if ("type" in this.$route.query) {
            let data = { type: this.$route.query.type };
            this.getData(data, "分类: " + this.$route.query.type);
        }
        if ("tag" in this.$route.query) {
            let data = { tag: this.$route.query.tag };
            this.getData(data, "标签: " + this.$route.query.tag);
        }
    },

    methods: {
        getData(data, title) {
            //获取分类下的所有文章
            this.$api.post("getArticles", data).then(res => {
                let tData = [];
                res.data.map(item => {
                    item.id && tData.push(item);
                });
                this.listTitle = title;
                this.list = tData;
            });
        }
    }
};
</script>

<style >
h2 {
    background-color: burlywood;
    padding: 10px;
}
</style>