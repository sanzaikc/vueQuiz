<template>
    <div>
        <fab
            main-icon="menu"
            bg-color="#007bff"
            :actions="fabActions"
            @show="showSidebar"
        >
        </fab>
        <sidebar :text=" 'Creat' "></sidebar>
        <question-card></question-card>
    </div>
</template>

<script>
import fab from "vue-fab";
import QuestionCard from '../../../components/question/QuesCard.vue';
import Sidebar from '../../../components/question/QuesSidebar.vue';
export default {
    data(){
        return{
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
    },
    
    components: {
        fab,
        QuestionCard,
        Sidebar,
    }
}
</script>