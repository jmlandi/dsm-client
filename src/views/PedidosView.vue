<script>

    export default {
        data() {
            return {
                products: null,
                orders: null,
                userId: null
            }
        },
        methods: {
            fetchData: async function() {
                await this.fetchUserSession();
                const ordersResponse = await fetch('https://dsm-server.onrender.com/orders');
                if (!ordersResponse.ok) throw new Error(`HTTP error. Status: ${ordersResponse.status}`);
                const ordersData = await ordersResponse.json();
                this.orders = ordersData.filter(order => order.user_id === this.userId);
            },

            fetchUserSession: async function() {
                const sessionId = await localStorage?.dsmSessionId || null;
                if (!sessionId) return this.isLogged = false;
                try {
                    const sessionResponse = await fetch(`https://dsm-server.onrender.com/sessions/${sessionId}`);
                    if (!sessionResponse.ok) {
                        throw new Error(`HTTP response. Status: ${sessionResponse.status}`);
                    }
                    const sessionData = await sessionResponse.json();
                    this.userId = await sessionData.user_id;
                } catch (error) {
                    console.log('Request error:', error);
                }
            },
        },
        beforeMount() {
            this.fetchData();
        }
    }

</script>

<template>
    <div id="orders">
        <div id="orders-menu">
            <div class="order-list" v-for="order in orders" :key="order.id">
                <!-- <h3> {{ product.nome }} </h3> -->
                <!-- <p> Tamanho: {{ product.size }} </p> -->
                <p> ID pedido: {{ order.id }} </p>
                <p> Valor: R${{ order.amount }} </p>
                <p> Status: {{ order.status }} </p>
            </div>
        </div>
        <RouterLink to="/">
            <a class="home-link orders-home-link">Ir para home</a>
        </RouterLink>
    </div>
</template>