<script setup>
    import { ref, reactive } from 'vue';
    import { RouterLink, useRouter } from 'vue-router';
    import axios from 'axios';
    const routes = useRouter();
    const form = reactive({
        email: '',
        password: '',
        remember: '',
    });
    const error = ref('');
    const email_error = ref('');
    const pass_error = ref('');
    async function login() {
    try {
        const response = await axios.post('/api/login', form);
        const timer = ref(null);
        function clearValidationErrors() {
            email_error.value = '';
            pass_error.value = '';
        }
        function clearErrorValidation() {
            error.value = '';
        }
        function setValidationError() {
            clearValidationErrors();
            timer.value = setTimeout(() => {
                email_error.value =  response.data.errors.email;
                pass_error.value = response.data.errors.password;
            }, 1);
            setTimeout(() => {
                clearValidationErrors();
            }, 5000);
        }
        function setErrorValidation() {
            clearErrorValidation();
            timer.value = setTimeout(() => {
                error.value = response.data.message;
            }, 1);
            setTimeout(() => {
                clearErrorValidation();
            }, 5000);
        }
        // console.log(response)
        if (response.data.success) {
            localStorage.setItem('userToken', response.data.data.userToken);
            location.reload();
            routes.push('/');
        }
        else {
            if (response.data.errors) {
                setValidationError();
            }
            else {
                setErrorValidation();
            }
        }
    }
    catch (err) {
        console.error(err);
    }
}
</script>
<template >
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-xl-4">
                <div class="card">
                    <div class="card-body py-2">
                        <div class="text-center mt-4 mb-2">
                            <img :src="'../storage/image/logo.png'" alt="avatar" class="mb-2"  height="80" width="80">
                            <h4>Login Form</h4>
                        </div>
                        <div v-if="error" class="alert alert-danger d-flex align-items-center" role="alert">
                            <i class="fa-solid fa-triangle-exclamation px-1"></i>
                            <div>
                                {{ error }}
                            </div>
                        </div>
                        <form @submit.prevent="login">
                            <div class="row mb-2">
                                <div class="form-outline text-start">
                                    <label for="email" class="col-form-label">Email</label>
                                    <div class="input-group">
                                        <!-- <div class="input-group-text"><i class="bi bi-envelope-fill"></i></div> -->
                                        <input v-model="form.email" type="email" id="email" placeholder="Example: rubickking04@gmail.com" name="email" class="form-control" :class="{'form-control is-invalid' :email_error}"/>
                                        <span v-if="email_error" class="invalid-feedback" role="alert">
                                            <strong>{{ email_error[0] }}</strong>
                                        </span>
                                    </div>
                                </div>
                                <div class="form-outline text-start mb-2">
                                    <label for="password" class="col-form-label">Password</label>
                                    <div class="input-group">
                                        <!-- <span class="input-group-text" onclick="password_show_hide();">
                                            <i class="fas fa-eye" id="show_eye"></i>
                                            <i class="fas fa-eye-slash d-none" id="hide_eye"></i>
                                        </span> -->
                                        <input v-model="form.password" id="password" type="password" placeholder="Must be 8-20 characters long." class="form-control" :class="{'form-control is-invalid' :pass_error}" name="password">
                                        <span v-if="pass_error" class="invalid-feedback" role="alert">
                                            <strong>{{ pass_error[0] }}</strong>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-outline text-start">
                                <div class="row mb-2">
                                    <div class="col-lg-12">
                                        <div class="form-check">
                                            <input v-model="form.remember" class="form-check-input" type="checkbox" name="remember" id="remember">
                                            <label class="form-check-label" for="remember">Remember me</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center mb-3">
                                <button type="submit" class="btn btn-primary mb-2 col-12">Sign up</button>
                            </div>
                        </form>
                            <!-- <div class="text-start">
                                <p>Already have an account? <RouterLink to="/register">Sign in</RouterLink></p>
                            </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

</script>
