<template>
    <div>
        <Carousel v-model="value2" loop>
            <CarouselItem v-for="item in pic" :key="item.title">
                <div class="demo-carousel">
                    <router-link :to="item.src">
                        <img :src="item.img" />
                    </router-link>
                </div>
            </CarouselItem>
        </Carousel>
        <div class="article-list">
            <row type="flex" justify="space-around" class="code-row-bg">
                <i-col span="11">
                    <ArticleList :list="list" :title="listTitle" />
                </i-col>
                <i-col span="11">
                     <ArticleList :list="hotList" :title="hotListTitle" />
                </i-col>
            </row>
        </div>
    </div>
</template>

<script>
import ArticleList from "@/components/articleList.vue";

export default {
    name: "Index",
    components: { ArticleList },

    data() {
        return {
            value2: 0,
            pic: [],
            list: [],
            listTitle: "最新文章",
            hotList: [],
            hotListTitle: "最热文章"
        };
    },

    created() {
        this.$api.get("getIndexPic").then(res => {
            this.pic = res.data;
        });
        //获取所有文章
        this.$api.get("getNewArticle").then(res => {
            let rData = res.data.slice(0, 5);
            let tdata = [];
            rData.map(item => {
                item.id && tdata.push(item);
            });
            this.list = tdata;
        });
        //获取热点文章
        this.$api.get("getHotArticle").then(res => {
            let rData = res.data.slice(0, 5);
            let tdata = [];
            rData.map(item => {
                item.id && tdata.push(item);
            });
            this.hotList = tdata;
        });
    },

    methods: {}
};
</script>

<style>
    .demo-carousel{
        width: 98vw;
        height: 60vh;
    }
    .demo-carousel img{
        width: 80%;
        height: 100%;
        position: relative;
    }
    .demo-carousel div{
        padding: 30px;
        background: rgba(0, 0, 0, 0.5);
        position: absolute;
        z-index: 1;
        color: white;
        font-size: 60px;
        width: 70%;
        top:50%;
        transform: translateY(-50%);
        text-align: center;
    }
    .article-list{
        padding: 20px 0;
    }
</style>