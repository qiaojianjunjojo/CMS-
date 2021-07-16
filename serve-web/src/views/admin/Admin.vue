<template>
    <div>
        <Drawer title="用户管理菜单" :closable="false" placement="left" v-model="value2">
            <p @click="goUrl('article')">文章编写</p>
            <p @click="goUrl('type')">类型管理</p>
            <p @click="goUrl('articles')">文章管理</p>
            <p @click="goUrl('indexChange')">主页管理</p>
            <p @click="goUrl('users')">用户管理</p>
        </Drawer>
        <Button class="admin-btn" @click="value2 = true" type="primary">导航菜单</Button>
        <router-view />
    </div>
</template>

<script>
export default {
    name: "Admin",

    data() {
        return {
            value2: true
        };
    },

    mounted() {},

    methods: {
        goUrl(url) {
            this.$router.push({ path: "/admin/" + url });
        }
    }
};
</script>

<style  scoped>
.admin-btn{
    position: fixed;
    right: 5vw;
    top:200px;
    z-index: 100;
}
</style>