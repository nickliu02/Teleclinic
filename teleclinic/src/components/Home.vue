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
      console.log(this.$route.query.code);
      

      if (code && !localStorage.getItem('code_sent')) {
        localStorage.setItem("code_sent", "true");
        console.log("sending code")
        this.$axios.post(this.$API_URL+"/zoom/create", {
          code: code,
          email: localStorage.getItem("email")
        }, {headers: {'x-access-token': localStorage.getItem('jwt')}}) 
        .then(r => {
          console.log(r);
          this.$router.push('/doctor_queue');
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