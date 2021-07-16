<template>
    <div class="plane">
        <h2>登录</h2>
        <br />
        <row>
            <Input v-model="username" prefix="ios-contact" placeholder="输入用户名" style="width:auto" />
        </row>
        <br />
        <row>
            <Input
                v-model="password"
                icon="ios-clock-outline"
                type="password"
                placeholder="输入密码"
                style="width:auto"
            />
        </row>
        <br />
        <div>
            <Button @click="login" type="primary">用户登录</Button>
            <Button @click="register">用户注册</Button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",

    data() {
        return {
            username: "",
            password: ""
        };
    },

    mounted() {},

    methods: {
        login() {
            let data = {
                username: this.username,
                password: this.password
            };
            this.$api.post("users/login", data).then(res => {
                console.log(res.data);
                this.$Notice.info({
                    title: "提示",
                    desc: res.message
                });
                if (res.code === 0) {
                    sessionStorage.setItem("token", res.data.token);
                    sessionStorage.setItem("username", this.username);
                    this.$router.push({ path: "/" });
                } else {
                    sessionStorage.removeItem("token");
                }
            });
        },
        register() {
            this.$router.push({ path: "register" });
        }
    }
};
</script>

<style  scoped>
.plane {
    padding: 10vh 30vw;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>