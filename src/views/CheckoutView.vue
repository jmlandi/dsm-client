<script>
    export default {
        data() {
            return {
                selectedSize: '',
                userId: null
            };
        },
        methods: {
            processPurchase: async function() {
                if (!this.userId) this.$router.push('/login'); 
                try {
                    const paymentsResponse = await fetch('https://dsm-server.onrender.com/payments', {
                        method: 'POST',
                        body: JSON.stringify({
                            external_id: '',
                            acquirer: '',
                            method: 'MANUAL',
                            installments: 1,
                            status: 'CREATED'
                        }),
                        headers: {
                            'Content-Type':'application/json'
                        }
                    });

                    if (!paymentsResponse.ok) {
                        throw new Error(`HTTP error. Status: ${paymentsResponse.status}`);
                    }

                    const paymentsData = await paymentsResponse.json();
                    const paymentId = paymentsData?.id;
                    const selectedSize = this.onSelectSize(this.selectedSize);
                    console.log(paymentId);

                    const orderResponse = await fetch('https://dsm-server.onrender.com/orders', {
                        method: 'POST',
                        body: JSON.stringify({
                            user_id: this.userId,
                            product_id: selectedSize,
                            payment_id: paymentId,
                            amount: 39.90,
                            status: 'CREATED'
                        }),
                        headers: {
                            "Content-Type":"application/json"
                        }
                    })

                    if (!orderResponse.ok) {
                        throw new Error(`HTTP error. Status: ${orderResponse.status}`);
                    }

                    this.$router.push('/checkout/sucesso');
                } catch (error) {
                    console.log('Request error:', error);
                    this.$router.push('/checkout/erro');
                }
            },

            onSelectSize(size) {
                switch (size) {
                    case 'PP':
                        return 1
                        break;
                    case 'P':
                        return 2
                        break;
                    case 'M':
                        return 3
                        break;
                    case 'G':
                        return 4
                        break;
                    case 'GG':
                        return 5
                        break;
                    case 'XGG':
                        return 6
                        break;
                    default:
                        break;
                }
            },

            getUserSession: async function() {
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

            onBuy: async function() {
                if (this.selectedSize) await this.processPurchase(); 
            }
        },
        beforeMount() {
            this.getUserSession();
        }
    }
</script>

<template>
    <div id="home">
      <div id="home-menu">
        <div id="home-dsm">
          <img src="../assets/tshirt/dsm-tshirt.png" alt="Camiseta DSM" >
        </div>

        <div id="product-details">
          <h1>Camiseta DSM Básica</h1>

          <label for="size"></label>
          <select class="select" id="size" v-model="selectedSize">
            <option value="" disabled selected>Tamanho</option>
            <option value="PP">PP</option>
            <option value="P">P</option>
            <option value="M">M</option>
            <option value="G">G</option>
            <option value="GG">GG</option>
            <option value="XGG">XGG</option>
          </select>

          <!-- <label for="quantity"></label>
          <select class="select" id="quantity" v-model="selectedQuantity">
            <option value="" disabled selected>Quantidade</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select> -->

          <p class="total">Total:</p>
          <p>R$ <span class="price">39,90</span></p>
          <button id="buy-button" @click="onBuy()">Comprar</button>
          <RouterLink to="/">
            <a class="home-link">Ir para home</a>
          </RouterLink>
        </div>
      </div>
    </div>
</template>