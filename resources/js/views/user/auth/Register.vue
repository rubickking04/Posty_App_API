<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
    const routes = useRouter();
    const form = reactive({
        name: '',
        email: '',
        password: '',
    });
    const name_error = ref('');
    const email_error = ref('');
    const pass_error = ref('');
    async function register() {
        try {
        const timer = ref(null);
        function clearValidationErrors() {
            name_error.value = '';
            email_error.value = '';
            pass_error.value = '';
        }
        function setValidationError() {
            clearValidationErrors();
            timer.value = setTimeout(() => {
                name_error.value = response.data.message.name;
                email_error.value = response.data.message.email;
                pass_error.value = response.data.message.password;
            }, 1);
            setTimeout(() => {
                clearValidationErrors();
            }, 5000);
        }
        const response = await axios.post('/api/register', form);
        // console.log(response)
        if (response.data.success) {
            localStorage.setItem('userToken', response.data.data.userToken);
            location.reload();
            routes.push('/');
        } else {
            setValidationError();
        }
    } catch (err) {
        console.error(err);
    }
}
</script>

<template>
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body py-2">
                        <div class="text-center mt-4">
                            <img :src="'../storage/image/logo.png'" alt="avatar" class="mb-2"  height="80" width="80">
                            <h4>Registration Form</h4>
                        </div>
                        <form @submit.prevent="register">
                            <div class="row mb-2">
                                <div class="form-outline text-start">
                                    <label for="name" class="col-form-label">Name</label>
                                    <div class="input-group">
                                        <!-- <div class="input-group-text"><i class="fa-solid fa-user"></i></div> -->
                                        <input v-model="form.name" type="text" id="name" placeholder="Example: Al-Fhaigar Usman" name="name" class="form-control" :class="{'form-control is-invalid' :name_error}"/>
                                        <span v-if="name_error" class="invalid-feedback" role="alert">
                                            <strong>{{ name_error[0] }}</strong>
                                        </span>
                                    </div>
                                </div>
                                <div class="form-outline text-start">
                                    <label for="email" class="col-form-label">Email</label>
                                    <div class="input-group">
                                        <!-- <div class="input-group-text"><i class="bi bi-envelope-fill"></i></div> -->
                                        <input v-model="form.email" type="text" placeholder="Example: rubickking04@gmail.com" name="email" class="form-control" :class="{'form-control is-invalid' :email_error}"/>
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
                            <div class="text-center mb-3">
                                <button type="submit"
                                    class=" text-center col-12 btn btn-primary mb-2">Sign up</button>
                            </div>
                            <!-- <div class="text-center">
                                <p>Already have an account? <RouterLink to="/login">Sign in</RouterLink></p>
                            </div> -->
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
