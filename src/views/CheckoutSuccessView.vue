<script>
</script>

<template>
    <div id="home">
      <div id="home-menu">
        <div id="home-dsm">
          <img src="../assets/icons/sucesso.png" alt="sucesso" >
        </div>
        <div id="product-details">
          <h1>Compra Realizada!</h1>
          <RouterLink :to="dinamicRoute">
            <button id="mypurchase-button">Meus Pedidos</button>
          </RouterLink>
          <RouterLink to="/">
            <a class="home-link">Ir para home</a>
          </RouterLink>
        </div> 
      </div>
    </div>
</template>