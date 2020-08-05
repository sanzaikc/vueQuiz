<template>
    <div>
        <fab
            main-icon="menu"
            bg-color="#007bff"
            :actions="fabActions"
            @show="showSidebar"
        >
        </fab>
        <sidebar :text=" 'Creat' " v-model="isLoading" @onSubmit="create"></sidebar>
        <transition-group name="slide-fade">
            <question-card v-for="(question, index) in questions" :key="question.id" :question="question" :index="index"></question-card>
        </transition-group>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import fab from "vue-fab";
import QuestionCard from '../../../components/question/QuesCard.vue';
import Sidebar from '../../../components/question/QuesSidebar.vue';
export default {
    mounted(){
        this.$store.dispatch('retriveQuestions');
    },
    data(){
        return{
            isLoading: false,
            fabActions: [
				{
					name: "show",
					icon: "add",
				},
			],
        }
    },
    methods: {
        showSidebar() {
			document.getElementById("sidebar").click();
        },
        create(question){
            this.isLoading = true;
            this.$store.dispatch('createQuestion',question)
                .then(res => {
                    if(res) this.$toasted.show("Question added successfully");
                    this.isLoading = false;
                    document.getElementById("sidebar").click();
                })
                .catch(error => {
                        if(error.errors.body[0] =="The body has already been taken."){
                            this.$toasted.show("Question already exists!", {
                            theme: 'bubble',
                        });
                        this.isLoading = false;
                    }  
                });
        }
    },
    computed:{
        ...mapState({
            'questions': state => state.questions.questionList,
        }),
    },
    components: {
        fab,
        QuestionCard,
        Sidebar,
    }
}
</script>