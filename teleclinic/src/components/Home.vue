<template>
  <v-app>
      <Navbar>
      </Navbar>
  </v-app>
</template>

<script>
import Navbar from './Navbar'

export default {
    name: "Home",
    components: {
    Navbar
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
        this.$router.push('doctor_queue');
        
        
    }
}
</script>

<style>

</style>