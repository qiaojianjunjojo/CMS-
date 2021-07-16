<template>
    <div class="footer">
        <div v-for="item in footer" :key="item.name" class="footer-div">
            {{item.name}}:
            <router-link :to="item.src">{{item.text}}</router-link>
        </div>
        <div class="icp">{{icp}}</div>
    </div>
</template>

<script>
export default {
    name: "Footer",

    data() {
        return {
            footer: [],
            icp: "Copyright 2020 |京ICP 备 0000"
        };
    },
    created() {
        this.$api.get("getFooter").then(res => {
            this.footer = res.data;
        });
    },
    mounted() {},

    methods: {}
};
</script>

<style  scoped>
.footer{
    background: #4a4b4a;
    color: azure;
    min-height: 120px;
    display: flex;
    flex-direction: column;
}
.footer a{
    color: aliceblue;
}

.footer-div{
    padding-top: 20px;
}
.icp{
    color: darkgrey;
   
}
</style>