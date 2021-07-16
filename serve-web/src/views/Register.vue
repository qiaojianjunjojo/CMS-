<template>
    <div class="plane">
        <h2>注册</h2>
        <div>
            <Row class="text-item">
                <i-col span="12">输入用户名:</i-col>
                <i-col span="12">
                    <Input v-model="username" placeholder="输入用户名" style="width:auto" />
                </i-col>
            </Row>
            <Row class="text-item">
                <i-col span="12">输入密码:</i-col>
                <i-col span="12">
                    <Input
                        v-model="password"
                        type="password"
                        placeholder="输入密码"
                        style="width:auto"
                    />
                </i-col>
            </Row>
            <Row class="text-item">
                <i-col span="12">再次输入密码:</i-col>
                <i-col span="12">
                    <Input
                        v-model="repassword"
                        type="password"
                        placeholder="重新输入密码"
                        style="width:auto"
                    />
                </i-col>
            </Row>
            <Row class="text-item">
                <i-col span="12">输入用户昵称:</i-col>
                <i-col span="12">
                    <Input v-model="nikename" placeholder="输入昵称" style="width:auto" />
                </i-col>
            </Row>
            <Row class="text-item">
                <i-col span="12">输入电话:</i-col>
                <i-col span="12">
                    <Input v-model="phone" placeholder="输入电话" style="width:auto" />
                </i-col>
            </Row>
            <Row class="text-item">
                <i-col span="12">输入年龄:</i-col>
                <i-col span="12">
                    <Input v-model="age" placeholder="输入年龄" type="number" style="width:auto" />
                </i-col>
            </Row>
            <Row class="text-item">
                <i-col span="12">性别:</i-col>
                <i-col span="12">
                    <Radio-group v-model="sex">
                        <Radio label="male">男</Radio>
                        <Radio label="female">女</Radio>
                    </Radio-group>
                </i-col>
            </Row>
        </div>
        <br />
        <Button type="primary" @click="register">用户注册</Button>
    </div>
</template>

<script>
export default {
    name: "Register",

    data() {
        return {
            username: "",
            password: "",
            repassword: "",
            nikename: "",
            phone: "",
            age: 0,
            sex: "male"
        };
    },

    mounted() {},

    methods: {
        register() {
            if (this.username && this.password && this.repassword) {
                if (this.password === this.repassword) {
                    let data = {
                        username: this.username,
                        password: this.password,
                        sex: this.sex,
                        age: this.age ? this.age : "未知",
                        nikename: this.nikename ? this.nikename : "未知",
                        phone: this.phone
                    };
                    this.$api.post("users/register", data).then(res => {
                        this.$Notice.info({
                            title: "提示",
                            desc: res.message
                        });
                        if (res.code === 0) {
                            this.$router.push({ path: "/login" });
                        }
                    });
                } else {
                    this.$Notice.open({
                        title: "错误",
                        desc: "2次输入密码不一致,请确认重新输入！",
                        duration: 5
                    });
                }
            } else {
                this.$Notice.open({
                    title: "错误",
                    desc: "内容输入错误,请输入必要信息",
                    duration: 5
                });
            }
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
    justify-content: space-between;
}
.text-item {
    padding-top: 10px;
}
</style>