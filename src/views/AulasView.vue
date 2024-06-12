<script>
export default {
    data() {
        return {
            days: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
            semester: '1',
            display: "Segunda",
            indexDisplay: 0,
            data: null,
            firstLesson: null,
            secondLesson: null
        };
    },
    methods: {
        fetchData: async function() {
            try {
                const response = await fetch('https://dsm-server.onrender.com/lessons');
                if (!response.ok) {
                    throw new Error(`HTTP error. status: ${response.status}`);
                }
                const data = await response.json();
                this.data = data;
            } catch (error) {
                console.error('Request error:', error);
            }
            this.renderData();
        },
        dayNext() {
            this.indexDisplay++;
            if(this.indexDisplay > 5) this.indexDisplay = 0;
            this.display = this.days[this.indexDisplay];
            this.renderData();
        },
        dayBefore() {
            this.indexDisplay--;
            if(this.indexDisplay < 0) this.indexDisplay = 0;
            this.display = this.days[this.indexDisplay];
            this.renderData();
        },
        renderData() {
            if (this.data) {
                const semester = parseInt(this.semester, 10);
                const day = this.indexDisplay + 1;
                const showData = this.data.filter(lesson => lesson.course_id === semester && lesson.weekday === day);
                this.firstLesson = showData[0];
                this.secondLesson = showData[1];
            }
        },
        formatHour(str) {
            if (str) return str.split("T")[1].slice(0, 5);
        }
    },
    beforeMount() {
        this.fetchData();
    }
}
</script>


<template>
    <div id="home">
            <div id="semester">
                <select name="semester" class="semester" v-model="semester" @change="renderData()">
                    <option value="1">Primeiro Semestre</option>
                    <option value="2">Segundo Semestre</option>
                    <option value="3">Terceiro Semestre</option>
                    <option value="4">Quarto Semestre</option>
                    <option value="5">Quinto Semestre</option>
                    <option value="6">Sexto Semestre</option>
                </select>
            </div>
        <div class="day">
            <button v-on:click="dayBefore()"> < </button> 
            <p class="day-selected"> {{ display }} </p>
            <button v-on:click="dayNext()"> > </button> 
        </div>
        <div class="hour">
            <div class="lesson-block">
                <div class="lesson">
                    <p class="lesson-hour"> {{ formatHour(firstLesson?.start_hour) || "N/A" }} </p>
                    <p class="lesson-name"> {{ firstLesson?.name || "N/A" }} </p>
                    <p class="lesson-hour"> {{ formatHour(firstLesson?.end_hour) || "N/A" }} </p>
                </div>
                <p class="lesson-details"> Professor(a): <span class="bold">{{ firstLesson?.teacher || "N/A" }}</span> | Local: <span class="bold">{{ firstLesson?.local || "N/A" }}</span></p>
            </div>
            <div class="lesson-line"></div>
            <div class="lesson-block">
                <div class="lesson lesson-last">
                    <p class="lesson-hour"> {{ formatHour(secondLesson?.start_hour) || "N/A" }} </p>
                    <p class="lesson-name"> {{ secondLesson?.name || "N/A" }} </p>
                    <p class="lesson-hour"> {{ formatHour(secondLesson?.end_hour) || "N/A" }} </p>
                </div>
                <p class="lesson-details"> Professor(a): <span class="bold">{{ secondLesson?.teacher || "N/A" }}</span> | Local: <span class="bold">{{ secondLesson?.local || "N/A" }}</span></p>
            </div>
        </div>
        <RouterLink to="/">
            <a class="home-link">Ir para home</a>
        </RouterLink>
    
    </div>
</template>