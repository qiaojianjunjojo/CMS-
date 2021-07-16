<template>
    <div>
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
// @ is an alias to /src
import ArticleList from "@/components/articleList.vue";

export default {
    name: "Home",
    components: {
        ArticleList
    },
    data() {
        return {
            list: [],
            listTitle: "收藏文章"
        };
    },
    created() {
        this.$api.get("users/user/saveList").then(res => {
            let tData = [];
            res.data.map(item => {
                if (item.a_id != 0) {
                    tData.push({ id: parseInt(item.a_id), title: item.title });
                }
            });
            this.list = tData;
        });
    }
};
</script>
