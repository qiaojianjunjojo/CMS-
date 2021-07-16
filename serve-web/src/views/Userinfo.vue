<template>
    <div class="plane">
        <h2>用户资料</h2>
        <div v-if="userInfo.phone">
            <Row class="text-item">
                <i-col span="12">输入用户昵称:</i-col>
                <i-col span="12">
                    <Input v-model="userInfo.nikename" placeholder="输入昵称" style="width:auto" />
                </i-col>
            </Row>
            <Row class="text-item">
                <i-col span="12">输入电话:</i-col>
                <i-col span="12">
                    <Input v-model="userInfo.phone" placeholder="输入电话" style="width:auto" />
                </i-col>
            </Row>
            <Row class="text-item">
                <i-col span="12">输入年龄:</i-col>
                <i-col span="12">
                    <Input
                        v-model="userInfo.age"
                        placeholder="输入年龄"
                        type="number"
                        style="width:auto"
                    />
                </i-col>
            </Row>
            <br />
            <Button @click="changeUserinfo">修改资料</Button>
            <Button @click="showChangePwd">修改密码</Button>
            <div v-show="changePsd">
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
                            placeholder="输入密码"
                            style="width:auto"
                        />
                    </i-col>
                </Row>
                <Button @click="changeUserPsd">修改密码</Button>
            </div>
        </div>
        <div v-else>
            <Row class="text-item">
                <i-col span="12">用户名:</i-col>
                <i-col span="12">{{userInfo.username}}</i-col>
            </Row>
            <Row class="text-item">
                <i-col span="12">昵称</i-col>
                <i-col span="12">{{userInfo.nikename}}</i-col>
            </Row>
            <Row class="text-item">
                <i-col span="12">年龄:</i-col>
                <i-col span="12">{{userInfo.age}}</i-col>
            </Row>
            <Row class="text-item">
                <i-col span="12">性别:</i-col>
                <i-col span="12">{{userInfo.sex}}</i-col>
            </Row>
        </div>
    </div>
</template>

<script>
export default {
    name: "Userinfo",

    data() {
        return {
            userInfo: {},
            changePsd: false,
            password: "",
            repassword: ""
        };
    },

    created() {
        if ("username" in this.$route.params) {
            this.$api.get("users/user/info/" + this.$route.params.username).then(res => {
                if (res.code === 0) {
                    this.userInfo = res.data;
                } else {
                    this.$Notice.open({
                        title: "错误",
                        desc: "用户信息错误",
                        duration: 5
                    });
                    if (res.code === 403) {
                        this.$router.push({ path: "/login" });
                    }
                }
            });
        }
    },

    methods: {
        showChangePwd() {
            this.changePsd = !this.changePsd;
        },
        changeUserinfo() {
            let data = {
                nikename: this.userInfo.nikename,
                age: this.userInfo.age,
                phone: this.userInfo.phone
            };
            this.changeInfo(data);
        },
        changeUserPsd() {
            if(!this.repassword || !this.password){
                this.$Notice.info({
                    title:'提示',
                    desc:'请确保密码输入无误!'
                })
                return
            }
            if (this.repassword === this.password) {
                let data = { password: this.password };
                this.changeInfo(data)
            }else{
                 this.$Notice.info({
                    title:'提示',
                    desc:'请确保2次输入密码一致!'
                })
            }
        },
        //统一的提交方法
        changeInfo(data){
            this.$api.post('users/user/changeInfo',data).then(res=>{
                this.$Notice.info({
                    title:'提示',
                    desc:res.message
                })
            })
        }
    }
};
</script>

<style  scoped>
.plane {
    padding: 10vh 10vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
.plane .text-item{
    width: 200px;
    font-size: 16px;
}
.text-item {
    padding-top: 10px;
}
h2{
    background-color: burlywood;
}
</style>