<template>
    <div class="article">
        <!-- 私信详情 -->
        <div>
            <h3>与{{mail.toUser}}的对话</h3>
            <List style="text-align:left" item-layout="vertical">
                <ListItem v-for="item in mail.mail" :key="item.time">
                    <ListItemMeta :title="Date(item.time)" :description="item.text" />
                </ListItem>
            </List>
        </div>
        <!-- 评论 -->
        <div>
            <h3 style="text-align:left">聊天框</h3>
            <i-input v-model="mailText" type="textarea" :rows="4" placeholder="请输入。。。"></i-input>
            <br />
            <br />
            <Button @click="submitMail">提交</Button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Mail",

    data() {
        return {
            mail: { mail: [], toUser: "" },
            mailText: "",
            id: 0
        };
    },

    created() {
        if ("id" in this.$route.params) {
            let id = this.$route.params.id;
            this.getMail(id);
        }
    },

    methods: {
        info(text) {
            this.$Notice.info({
                title: "提示",
                desc: text
            });
        },
        submitMail() {
            let sendData = { text: this.mailText };
            this.$api.post("users/user/mail/" + this.mail.toUser, sendData).then(res => {
                if (res.code === 0) {
                    this.info("发送成功");
                    setTimeout(() => {
                        this.getMail(this.id);
                        this.mailText = "";
                    }, 2000);
                } else {
                    this.info(this.message);
                }
            });
        },
        getMail(id) {
            //获取私信
            this.$api.get("users/user/mailGet/" + id).then(res => {
                if (res.code === 0) {
                    this.mail = res.data;
                    this.id = id;
                } else {
                    this.info(res.message);
                }
            });
        }
    }
};
</script>

<style  scoped>
.article {
    padding: 10px 10vw;
}
</style>