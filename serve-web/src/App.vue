<template>
    <div id="app">
        <div class="nav">
            <MyNav></MyNav>
        </div>
        <div class="middle">
             <router-view />
        </div>
       
        <div class="footer">
            <Footer></Footer>
        </div>
    </div>
</template>

<script>
import MyNav from "@/components/MyNav.vue";
import Footer from "@/components/Footer.vue";

export default {
    name: "App",

    components: { MyNav, Footer },

    data() {
        return {};
    },

    mounted() {},

    methods: {}
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    min-height: 100vh;
    position: relative;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}

.footer{
   position: absolute;
   width: 100%;
   bottom: 0px;
}
.middle{
    margin-bottom: 200px;
    height: 740px;
    overflow: scroll;
}
</style>
