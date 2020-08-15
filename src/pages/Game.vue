<template>
    <div>
        <h2>Game here</h2>
    </div>
</template>

<script>
export default {
     mounted(){
        //  console.log(this.data);
         window.Echo.channel('quizy' + this.data.quiz_id )
            .listen('QuestionChanged', (e) => {
                console.log(e);
         });
     },
     props:{
         data: {
             type: Object
         }
     }
}
</script>