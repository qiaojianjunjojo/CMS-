<template>
    <div class="article">
        <div class="type">
            <h2>用户私信页</h2>
            <Divider />
            <div v-if="mails.length">
                <List item-layout="vertical">
                    <ListItem v-for="mail in mails" :key="mail.m_id">
                        <router-link :to="'/mailGet/' + mail.m_id">
                            <ListItemMeta
                                title="私信"
                                :description="mail.users[1] + '与' + mail.users[0]"
                            />
                        </router-link>
                    </ListItem>
                </List>
            </div>
            <div v-else>
                <h2>暂无私信</h2>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Mails",

    data() {
        return {
            mails: []
        };
    },

    created() {
        this.$api.get("users/user/mailsGet").then(res => {
            if (res.code === 0) {
                this.mails = res.data;
            } else {
                this.info(res.message);
            }
        });
    },

    methods: {
        info(text) {
            this.$Notice.info({
                title: "提示",
                desc: text
            });
        }
    }
};
</script>

<style  scoped>
h2 {
    background-color: burlywood;
    padding: 10px;
}
</style>