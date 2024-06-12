<script>
    export default {
        data() {
            return {
                formEmail: '',
                formPassword: '',
                message: ''
            }
        },
        methods: {
            login: async function() {
                try {
                    const usersResponse = await fetch('https://dsm-server.onrender.com/users');
                    if (!usersResponse.ok) throw new Error(`HTTP error. Status: ${usersResponse.status}`);
                    const usersData = await usersResponse.json();
                    const user = await usersData.filter(user => user.email === this.formEmail && user.password === this.formPassword);
                    console.log(user);
                    if (user[0].id) {
                        const sessionResponse = await fetch('https://dsm-server.onrender.com/sessions', {
                            method: 'POST',
                            body: JSON.stringify({ user_id: user[0].id }),
                            headers: {
                                'Content-Type':'application/json'
                            }
                        })
                        if (!sessionResponse.ok) {
                            throw new Error(`HTTP error. Status: ${sessionResponse.status}`);
                        }
                        const sessionData = await sessionResponse.json();
                        if (localStorage.getItem('dsmSessionId')) localStorage.removeItem('dsmSessionId');
                        localStorage.setItem('dsmSessionId', sessionData.id);
                        this.$router.push('/');
                    } else {
                        console.log('Dados inválidos, tente novamente ou cadastre-se.')
                        this.message = 'Dados inválidos, tente novamente ou cadastre-se.'
                    }
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
            <label class="login-label">E-mail</label>
            <input class="login-input" type="text" placeholder="Digite seu nome" v-model="formEmail">
            <label class="login-label">Senha</label>
            <input class="login-input" type="password" placeholder="Digite sua senha" v-model="formPassword">
            <button class="login-btn" @click="login()">Login</button>
        </div>
    </div>
</template>