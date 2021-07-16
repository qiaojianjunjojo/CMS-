<template>
    <div class="article_writer">
        <div class="item">
            <h3>文章名称</h3>
            <Input v-model="title" style="width:300px" placeholder="输入文章标题" />
        </div>
        <div class="item">
            <h3>文章作者</h3>
            <Input v-model="writer" style="width:300px" placeholder="输入文章作者" />
        </div>
        <div class="item">
            <h3>文章分类</h3>
            <Select v-model="type" style="width:200px">
                <Option v-for="item in articleType" :value="item.uid" :key="item.uid">{{item.name}}</Option>
            </Select>
        </div>
        <div class="item">
            <h3>文章小标签</h3>
            <Input v-model="tag" style="width:300px" placeholder="使用空格进行分割" />
        </div>
        <!-- 文章详情 -->
        <div>
            <h3 style="text-align:left">文章详情</h3>
            <VueTinymce v-model="text" :setting="setting" />
            <br />
            <br />
            <Button @click="submission">提交</Button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Writearticle",

    data() {
        return {
            content: "",
            setting: {
                menubar: false,
                toolbar:
                    "undo redo | fullscreen | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |",
                toolbar_drawer: "sliding",
                quickbars_selection_toolbar: "removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor",
                plugins: "link image media table lists fullscreen quickbars",
                // language: "zh_CN", //本地化设置
                height: 300
            },
            text: "测试文章",
            title: "Nodejs",
            type: "",
            tag: "node vue",
            writer: "JOJO",
            articleType: []
        };
    },

    mounted() {},
    created() {
        this.$api.get("users/user/articleType").then(res => {
            this.articleType = res.data;
        });
    },

    methods: {
        info(text) {
            this.$Notice.info({
                title: "提示",
                desc: text
            });
        },
        submission() {
            let data = {
                title: this.title,
                writer: this.writer,
                text: this.text,
                type: parseInt(this.type),
                tag: this.tag.split(" ")
            };
            this.$api.post("admin/setArticle", { article: data }).then(res => {
                this.info(res.message);
            });
        }
    }
};
</script>

<style>
.article_writer {
    padding: 40px 10vh;
    text-align: left;
}

.article_writer .item {
    padding-bottom: 20px;
}
.article h2 {
    padding: 20px;
}
</style>