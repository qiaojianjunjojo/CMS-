<template>
    <div>
        <h2>文章列表管理</h2>
        <div class="list-manager">
            <row type="flex" justify="space-around" class="code-row-bg">
                <i-col span="15">
                    <List>
                        <ListItem v-for="item in list" :key="item.id" class="item">
                            <ListItemMeta :title="item.title" :description="Date(item.date)" />
                            <template slot="action">
                                <li>
                                    <Button
                                        @click="online(item.id)"
                                        :class="item.show==0? 'green': 'gray'"
                                    >{{item.show ==0? '上线': '下线'}}</Button>
                                </li>
                            </template>
                        </ListItem>
                    </List>
                </i-col>
            </row>
        </div>
    </div>
</template>

<script>
export default {
    name: "AdminArticles",

    data() {
        return {
            list: [],
            listTitle: ""
        };
    },

    created() {
        this.getArticles();
    },

    methods: {
        online(id) {
            let data = { a_id: id };
            this.$api.post("admin/showArticle", data).then(res => {
                this.$Notice.info({
                    title: "提示",
                    desc: res.message
                });
            });
            setTimeout(() => {
                this.getArticles();
            }, 2000);
            
        },
        getArticles() {
            //获取所有文章
            this.$api.get("getNewArticle").then(res => {
                let tData = [];
                res.data.map(item => {
                    if (item.id != 0) {
                        tData.push(item);
                    }
                });
                this.list = tData;
            });
        }
    }
};
</script>

<style>
.list-manager {
    text-align: left;
}
h2 {
    padding: 20px;
    background-color: wheat;
}
.green{
    background-color: green;
    color: black;
}
.gray{
    background-color: gray;
    color: honeydew;
}
</style>