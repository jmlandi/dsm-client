<script>

    export default {
        data() {
            return {
                formName: '',
                formPhone: '',
                formEmail: '',
                formPassword: '',
                formConfirmPassword: '',
                message: ''
            }
        },
        methods: {
            userRequest: async function() {
                const confirmPassword = this.formPassword === this.formConfirmPassword;
                if (!confirmPassword) return this.message = 'Senhas não são iguais, verifique!';
                try {
                    const usersResponse = await fetch('https://dsm-server.onrender.com/users', {
                        method: 'POST',
                        body: JSON.stringify({
                            name: this.formName,
                            phone: this.formPhone,
                            email: this.formEmail,
                            password: this.formPassword
                        }),
                        headers: {
                            'Content-Type':'application/json'
                        }
                    })
                    if (!usersResponse.ok) {
                        throw new Error(`HTTP error. Status: ${orderResponse.status}`);
                    }
                    const userData = await usersResponse.json();
                    const sessionResponse = await fetch('https://dsm-server.onrender.com/sessions', {
                        method: 'POST',
                        body: JSON.stringify({ user_id: userData.id }),
                        headers: {
                            'Content-Type':'application/json'
                        }
                    })
                    if (!sessionResponse.ok) {
                        throw new Error(`HTTP error. Status: ${sessionData.status}`);
                    }
                    const sessionData = await sessionResponse.json();
                    localStorage.setItem('dsmSessionId', sessionData.id);
                    this.$router.push('/');
                } catch (error) {
                    console.log('Request error:', error);
                }
            }
        }
    }
</script>

<template>
    <div class="login-block">
        <div class="login-form">
            <label class="login-label">Como gostaria de ser chamado?</label>
            <input class="login-input" type="text" id="name" placeholder="Digite seu nome" v-model="formName">
            <label class="login-label">Qual seu telefone?</label>
            <input class="login-input" type="text" id="phone" placeholder="Digite seu telefone" v-model="formPhone">
            <label class="login-label">Qual seu melhor e-mail?</label>
            <input class="login-input" type="email" id="email" placeholder="Digite seu e-mail" v-model="formEmail">
            <label class="login-label">Digite sua senha:</label>
            <input class="login-input" type="password" id="pwd" placeholder="Digite sua senha" v-model="formPassword">
            <label class="login-label">Confirme sua senha:</label>
            <input class="login-input" type="password" id="pwd-confirm" placeholder="Confirme sua senha" v-model="formConfirmPassword">
            <button class="login-btn" @click="userRequest()">Cadastrar-se</button>
        </div>
    </div>
</template>