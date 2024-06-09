<script>
    export default {
        data() {
            return {
            isLogged: false,
            name: "Aluno",
            dinamicRoute: this.getDinamicRoute()
            }
        },
        methods: {
            getDinamicRoute() {
                return this.isLogged ? '/pedidos' : '/login';
            }
        }
    }
</script>

<template>
    <div id="home">
        <div id="home-menu">
        <div id="home-dsm">
            <img src="../assets/icons/dsm.png" width="75%" id="home-dsm">
        </div>
        <p v-if="isLogged">
            Bem vindo, <span class="orange-color">{{name}}</span>!
        </p>
        <p v-else>
            Bem vindo!
        </p>
            <RouterLink :to="dinamicRoute">
                <div class="home-item">
                    <img src="../assets/icons/user.png" width="20px">
                    <p v-if="isLogged">Meus Pedidos</p>
                    <p v-else>Faça Login</p>
                </div>
            </RouterLink>
            <RouterLink to="/checkout">
                <div class="home-item">
                    <img src="../assets/icons/cart.png" width="20px">
                    <p>Compre seu Uniforme!</p>
                </div>
            </RouterLink>
            <RouterLink to="/aulas">
                <div class="home-item">
                    <img src="../assets/icons/clock.png" width="20px">
                    <p>Horários de Aula</p>
                </div>
            </RouterLink>
            <a href="https://siga.cps.sp.gov.br/ALUNO/login.aspx" target="_blank">
            <div class="home-item home-item-last">
                <img src="../assets/icons/book.png" width="20px">
                <p>Portal do Aluno (SIGA)</p>
            </div>
            </a>
        </div>
    </div>
</template>
