<script>
import SignIn from './loginSignIn.vue'
import SignUp from './loginSignUp.vue'

export default {
    components: {
        SignIn,
        SignUp
    },
    data() {
        return {
            currentComponent: null
        };
    },
    methods: {
        setCurrentComponent(component) {
            this.currentComponent = component;
        }
    }
}
</script>


<template>
    <div id="login-screen">
        <div class="login-block">
            <h1>Seja bem vindo ao portal do DSM!</h1>
            <button id="sign-in-btn" @click="setCurrentComponent('SignIn')">Login</button>
            <button id="sign-up-btn" @click="setCurrentComponent('SignUp')">Cadastre-se</button>
        </div>
        <component :is="currentComponent"></component>
        <div class="login-footer">
            <RouterLink to="/">
                <a class="login-home-link">Voltar para home</a>
            </RouterLink>
        </div>
    </div>
</template>
