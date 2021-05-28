<template>
   <div>

   </div>
</template>


<script>
import axios from "axios"
export default {
    name: "Categoria",
    data () {
        return {
            categorias:[],
        };
    },
    created () {
this.listarCategorias();
    },
    components: {

    },
    methods: {
        listarCategorias(){
            let header = {headers:{"token":this.$store.state.token}};
            axios
            .get("categoriaGet",header)
            .then((response) =>{
                console.log(response.data.categoriaGet);
                this.categorias= response.data.categoriaGet;
            })
            .catch((error)=>{
                console.log(error.response);
            });
        },

    },
    
};
</script>


<style>

</style>