<template>
  <v-app>
      <h1><a>Doctor Queue</a></h1>
  </v-app>
</template>

<script>
export default {
    name: "DoctorQueue",
    methods: {
        
    },
    mounted() {
       
        let code = this.$route.query.code;
        if (code) {
            this.$axios.post(this.$API_URL+"/create", {
            code: code,
            email: "santaclaus@gmail.com"
            })           
            .catch(e => {
                console.log(e);
            })
        }
        
        
    }
}
</script>

<style>

</style>