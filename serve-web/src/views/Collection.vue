<template>
    <div>
        <h2>我的收藏</h2>
        <hr>
        <div class="collection-list">
            <List item-layout="vertical">
                <ListItem v-for="item in list" :key="item.a_id">
                    <router-link :to="'/article/' + item.a_id">{{item.title}}</router-link>
                </ListItem>
            </List>
        </div>
    </div>
</template>

<script>
export default {
    name: "Collection",

    data() {
        return {
            list: [],
            listTitle: "我的收藏"
        };
    },

    created() {
        this.$api.get("users/user/saveList").then(res => {
            if (res.code == 0) {
                this.list = res.data;
            }
        });
    },

    methods: {}
};
</script>

<style  scoped>
h2 {
    background-color: burlywood;
    padding: 10px;
}
</style>