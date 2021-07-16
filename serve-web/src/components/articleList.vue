<template>
    <Card>
        <p slot="title">{{title}}</p>
        <p v-for="item in list" :key="item.id">
            <router-link :to="'/article/' + item.id">{{item.title}}</router-link>
        </p>
    </Card>
</template>

<script>
export default {
    name: "Articlelist",

    data() {
        return {};
    },

    created() {},

    props: {
        title: String,
        list: Array
    }
};
</script>

<style  scoped>
</style>