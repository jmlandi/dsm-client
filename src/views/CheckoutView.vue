<script>
    export default {
    data() {
        return {
        dinamicRoute: true ? '/checkout/sucesso' : '/checkout/erro',
        selectedSize: '', // Tamanho padrão selecionado
        selectedQuantity: '',
        };
    },
    }
    function processPurchase() {
    // Here you would have the logic to process the purchase
    let purchaseSuccessful = true;
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
            <option value="P">P</option>
            <option value="M">M</option>
            <option value="G">G</option>
            <option value="GG">GG</option>
          </select>

          <label for="quantity"></label>
          <select class="select" id="quantity" v-model="selectedQuantity">
            <option value="" disabled selected>Quantidade</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>

          <p class="total">Total:</p>
          <p>R$ <span class="price">39,90</span></p>
          <RouterLink :to="dinamicRoute">
            <button id="buy-button" onclick="processPurchase()">Comprar</button>
          </RouterLink>
          <RouterLink to="/">
            <a class="home-link">Ir para home</a>
          </RouterLink>
        </div>
      </div>
    </div>
</template>