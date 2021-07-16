<template>
    <div class="article">
        <!-- 面包屑 -->
        <Breadcrumb>
            <BreadcrumbItem to="/">
                <Icon type="ios-home-outline"></Icon>主页
            </BreadcrumbItem>
            <BreadcrumbItem to="/articles">
                <Icon type="ios-book"></Icon>全部文章
            </BreadcrumbItem>
            <BreadcrumbItem :to="{path:'/articleType',query:{type:article.type}}">
                <Icon type="md-share"></Icon>
                {{article.typename}}
            </BreadcrumbItem>
            <BreadcrumbItem :to="'/article/' + article.a_id">
                <Icon type="md-book"></Icon>
                {{article.title}}
            </BreadcrumbItem>
        </Breadcrumb>
        <!-- 小标签 -->
        <div>
            <Tag v-for="item in article.tag" :key="item">
                <router-link :to="{path:'/articleType',query:{tag:item}}">{{item}}</router-link>
            </Tag>
        </div>
        <!-- 文章详情 -->
        <div>
            <h2>{{article.title}}</h2>
            <p class="article-p">{{Date(article.time)}}</p>
            <p class="article-p">作者:{{article.writer}} 浏览量:{{article.view}} 收藏:{{article.like}}</p>
            <div class="article-text" v-html="article.text"></div>
        </div>
        <!-- 点赞收藏 -->
        <div>
            <Button @click="aLike(article.a_id,1)" type="info" :class="checkLike" ghost>
                <Icon type="ios-arrow-up" />赞
            </Button>
            <Button @click="aLike(article.a_id,0)" type="info" ghost>
                <Icon type="ios-arrow-up" />踩
            </Button>
        </div>
        <span>
            <Button @click="collection(article.a_id)" type="text">
                <Icon type="ios-heart" />收藏
            </Button>
        </span>
        <!-- 评论详情 -->
        <div class="type">
            <Divider />
            <List item-layout="vertical">
                <ListItem v-for="talk in articleTalk" :key="talk.talk">
                    <ListItemMeta :title="talk.username" :description="Date(talk.date)" />
                    {{talk.talk}}
                </ListItem>
            </List>
        </div>
        <!-- 评论功能 -->
        <Talk :a_id="article.a_id"></Talk>
    </div>
</template>

<script>
import Talk from "@/components/Talk.vue";

export default {
    name: "Article",
    components: { Talk },

    data() {
        return {
            article: {},
            articleTalk: [],
            checkLike: ""
        };
    },

    created() {
        if ("id" in this.$route.params) {
            let id = this.$route.params.id;
            this.$api.get("getArticle/" + id).then(res => {
                if (res.code === 0) {
                    this.article = res.data;
                    //获取文章评论
                    this.$api.get("getArticleTalk/" + id).then(res => {
                        this.articleTalk = res.data;
                    });
                } else {
                    this.info(res.message);
                }
            });
            //判断用户是否看过该文章;第一次看 +1;
            let view = localStorage.getItem("article_" + id);
            if (view) {
                localStorage.setItem("article_" + id, parseInt(view) + 1);
            } else {
                this.$api.get("viewArticle/" + id).then(res => {
                    console.log(res);
                });
                localStorage.setItem("article_" + id, 1);
            }
            //判断用户是否点赞过
            if (localStorage.getItem("article_" + id + "_like")) {
                this.checkLike = "green";
            }
        }
    },

    methods: {
        info(message) {
            this.$Notice.info({
                title: "提示",
                desc: message
            });
        },
        //获取文章评论
        getArticleTalk(id) {
            this.$api.get("getArticleTalk/" + id).then(res => {
                this.articleTalk = res.data;
            });
        },
        //收藏文章
        collection(id) {
            this.$api.get("users/user/save/" + id).then(res => {
                this.info(res.message);
            });
        },
        aLike(id, like) {
            if (localStorage.getItem("article_" + id + "_like")) {
                this.info("您已进行了评价!");
            } else {
                this.$api.get("users/user/like/" + id + "/" + like).then(res => {
                    this.info(res.message);
                    localStorage.setItem("article_" + id + "_like", 1);
                    this.checkLike = "green";
                });
            }
        }
    }
};
</script>

<style>
.type {
    text-align: left;
}
.article {
    padding: 40px 10vh 40px 10vh;
}
.article-p {
    color: #ababab;
}
.article h2 {
    padding: 20px;
    background-color: rgba(100, 119, 90, 0.808);
}
.article-text {
    padding: 20px 10vh;
}
.gray {
    background-color: rgb(106, 106, 114);
    color: black;
}
.green {
    background-color: lawngreen;
}
</style>