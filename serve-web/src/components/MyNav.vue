<template>
    <div>
        <Menu mode="horizontal" :theme="theme1" active-name="1">
            <MenuItem name="1">
                <div class="main">
                    <Icon type="md-book" />
                    <router-link to="/">{{index}}</router-link>
                </div>
            </MenuItem>
            <MenuItem v-for="item in menu" :name="item.name" :key="item.name">
                <router-link :to="item.src">{{item.name}}</router-link>
            </MenuItem>
            <MenuItem name="2">
                <Dropdown v-if="userBtn">
                    <a href="javascript:void(0)">
                        用户:{{username}}
                        <Icon type="ios-arrow-down"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem>
                            <div @click="goUrl('/userInfo/' + username)">个人信息</div>
                        </DropdownItem>
                        <DropdownItem>
                            <div @click="goUrl('/mail')">我的私信</div>
                        </DropdownItem>
                        <DropdownItem>
                            <div @click="goUrl('/collection')">我的收藏</div>
                        </DropdownItem>
                        <DropdownItem>
                            <div @click="exit">退出</div>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <router-link v-else :to="{path:'/login'}">登录</router-link>
            </MenuItem>
             <MenuItem name="3" v-if="username== 'admin'">
                <div class="main">
                    <Icon type="ios-man" />
                    <router-link to="/admin">Admin后台管理</router-link>
                </div>
            </MenuItem>
        </Menu>
    </div>
</template>

<script>
export default {
    name: "MyNav",
    data() {
        return {
            menu: [],
            index: "MySite",
            theme1: "light",
            userBtn:false,
            username:''
        };
    },
    created() {
        this.$api.get("getNavMenu").then(res => {
            this.menu = res.data;
        });
        setInterval(() => {
            if(sessionStorage.getItem('token')){
                this.userBtn = true
                this.username = sessionStorage.getItem('username')
            }else{
                this.userBtn = false
            }
        }, 3000);
    },

    mounted() {},

    methods: {
        exit(){
            sessionStorage.getItem('token') && sessionStorage.removeItem('token')
             this.$router.push({path:'/login'})
        },
        goUrl(url){
            this.$router.push({path:url})
        }

    }
};
</script>

<style  scoped>
.main {
    font-weight: 600;
}
a {
    color: #2f2f2f;
}
</style>