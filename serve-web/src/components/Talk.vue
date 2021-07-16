<template>
    <div>
        <h3 style="text-align:left">评论</h3>
        <Input  v-model="data" type="textarea" :rows="4" placeholder="请输入..." />
        <br />
        <br />
        <Button @click="submitTalk">提交评论</Button>
    </div>
</template>

<script>
export default {
    name: "Talk",

    data() {
        return {
            data: ""
        };
    },
    props: {
        a_id: {
            type:Number,
            default: 0
        }
    },
    mounted() {},

    methods: {
        submitTalk() {
            let data = {
                a_id: this.a_id,
                talk: this.data
            };
            this.$api.post("users/user/article/talk", data).then(res => {
                if (res.code === 0) {
                     this.$Notice.info({
                        title: "提示",
                        desc: res.message,
                        duration: 3
                    });
                    setTimeout(() => {
                        this.$parent.getArticleTalk(this.a_id);
                        this.data = ""
                    }, 1000);
                    
                } else {
                    this.$Notice.open({
                        title: "错误",
                        desc: res.message,
                        duration: 5
                    });
                }
            });
        }
    }
};
</script>

<style  scoped>
</style>