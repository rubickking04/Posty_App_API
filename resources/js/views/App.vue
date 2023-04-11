<template>
    <Navbar/>
    <router-view/>
</template>

<script>
    import Navbar from '../components/NavBar.vue'
export default {
    components: {
        Navbar,
    },
    mounted() {
            console.log('Component mounted.')
        }
    }
</script>
