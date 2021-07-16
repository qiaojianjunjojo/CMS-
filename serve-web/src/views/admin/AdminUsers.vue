<template>
    <div>
        <h2>用户列表</h2>
        <div class="list-manager">
            <row type="flex" justify="space-around" class="code-row-bg">
                <i-col span="15">
                    <List>
                        <ListItem v-for="item in list" :key="item.id" class="item">
                            <ListItemMeta :title="item.username" :description="'ip地址:' + item.ip" />
                            <template slot="action">
                                <li>
                                    <Button
                                        @click="online(item.username)"
                                        :class="item.login==0? 'red' : 'green'"
                                    >{{item.login ==0? '封停': '解封'}}</Button>
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
    name: "AdminUsers",

    data() {
        return {
            list: []
        };
    },

    created() {
        this.getUsers();
    },

    methods: {
        getUsers() {
            //获取所有的用户
            this.$api.get("admin/getAllUser").then(res => {
                this.list = res.data;
            });
        },
        online(username) {
            this.$api.get("admin/stopLogin/" + username).then(res => {
                this.$Notice.info({
                    title: "提示",
                    desc: res.message
                });
            });
            setTimeout(() => {
                this.getUsers(); //封停用户后刷新用户列表
            }, 3000);
        }
    }
};
</script>

<style>
.red {
    background-color: rgb(179, 55, 55);
    color: wheat;
}
.green {
    background-color: yellowgreen;
    color: rgb(179, 245, 182);
}

h2 {
    padding: 20px;
    background-color: wheat;
}
</style>