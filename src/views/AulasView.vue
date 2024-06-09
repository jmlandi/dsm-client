<script>
    export default {
        data() {
            return {
            dias:[
                "Segunda",
                "Terça",
                "Quarta",
                "Quinta",
                "Sexta",
                "Sabado"
            ],
            index:0,
            atual:"segunda"
            }
        },
        methods: {
            alterarDiaSeguinte(){
                this.index++ 
                if(this.index >= 6) this.index = 0
                this.atual = this.dias[this.index]
            },
            alterarDiaAnterior(){
                this.index--
                if(this.index < 0) this.index = 5
                this.atual = this.dias[this.index]
            }
            
        }
    }
</script>

<template>
    <div id="home">
            <div class="semestre">
                <!-- Selecão semestre -->
                    
                    <select name="semestre" id="semestre">
                        <option value="primeiro">Primeiro Semestre</option>
                        <option value="Segundo">Segundo Semestre</option>
                        <option value="Terceiro">Terceiro Semestre</option>
                        <option value="Quarto">Quarto Semestre</option>
                        <option value="Quinto">Quinto Semestre</option>
                        <option value="Sexto">Sexto Semestre</option>
                    </select>
            </div>
            <!-- Seleção dia  -->
        <div class="dia">
              <button class="buttonLeft"  v-on:click="alterarDiaAnterior()"><</button> 
                <p class="diaSelecionado">{{atual}}</p>
                <button v-on:click="alterarDiaSeguinte()">></button> 
        </div>

        <div class="horarios">
            <div class ="aula">
                <p class="aulaHorario"> 21:00 </p>
                <p class ="AulaNome"> Eng.Software </p>
                <p class="aulaHorario"> 21:00 </p>
            </div>
            <div class = "aula">
                <p class="aulaHorario" >21:00</p>
                <p class ="AulaNome">aula</p>
                <p class= "aulaHorario">21:00</p>
            </div>
            <div class ="aula">
                <p class="aulaHorario">21:00</p>
                <p class ="AulaNome">Aula</p>
                <p class="aulaHorario">21:00</p>
            </div>
            <div class ="aula aulaUltimo">
                <p class="aulaHorario">21:00</p>
                <p class ="AulaNome">Aula</p>
                <p class="aulaHorario">21:00</p>
            </div>

        </div>
    
    </div>
</template>

