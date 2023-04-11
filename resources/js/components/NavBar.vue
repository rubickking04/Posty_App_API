<script setup>
import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router';
    import axios from 'axios';
    const router = useRouter();
    const name = ref('');
    function removeToken() {
        localStorage.removeItem('userToken');
    }
    async function logout() {
        const token = localStorage.getItem('userToken');
        if (!token) {
            removeToken();
            router.push('/login');
        }
        try {
            await axios.post('api/logout', null, {
                headers: { Authorization: `Bearer ${token}` }
            });
        }
        catch (error) {
            console.error(error);
        }
        removeToken();
        name.value = '';
        router.push('/login');
        loadUserData();
    }
    async function loadUserData() {
        const token = localStorage.getItem('userToken');
        if (!token) {
            removeToken();
            return;
        }
        try {
            const data = await axios.get('api/user', {
                headers: { Authorization: `Bearer ${token}` }
            });
            name.value = data.data.name;
            // console.log(data);
        }
        catch (error) {
            if (error.response.status === 401) {
                removeToken();
            }
            console.error(error);
        }
    }
    onMounted(loadUserData);
</script>
<template>
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div class="container">
            <RouterLink class="navbar-brand" to="/"><img class="align-top" :src="'../storage/image/logo.png'" height="45" width="45"></RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink to="/" class="nav-link active" aria-current="page" >Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/dashboard" class="nav-link active" >Dashboard</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/posts" class="nav-link active">Post</RouterLink>
                    </li>
                </ul>
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li v-if="!name" class="nav-item">
                        <RouterLink to="/login" class="nav-link active">Login</RouterLink>
                    </li>
                    <li v-if="!name" class="nav-item">
                        <RouterLink to="/register" class="nav-link active">Register</RouterLink>
                    </li>
                    <li v-if="name" class="nav-item">
                        <a class="nav-link active">{{ name }}</a>
                    </li>
                    <li v-if="name" class="nav-item">
                        <a class="nav-link active" @click="logout" href="">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
