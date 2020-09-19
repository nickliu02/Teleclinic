<template>
    <v-app>
        <v-card 
          v-if="hasAppointment"
          width="600"
          class="mx-auto my-auto"
        >
            <v-card-title class="black--text accent">
              <h1 class="mx-auto" id="welcome">
                Welcome, {{name}}
              </h1>         
            </v-card-title>

            <v-divider></v-divider>

            <div style="padding: 20px">
              <h3 align="center">
                Your appointment is at {{appointmentTime}}.
              </h3>
              
              <v-spacer></v-spacer>

              <h3 align="center">
                Join call:
              </h3>

              <v-card width="300" class="mx-auto" raised style="margin: 10px">
                <v-card-title class="black--text">
                  <a v-bind:href="link" target="_blank" 
                    class="mx-auto" id="welcome"
                    style="text-decoration:none"  
                    
                    
                  >
                    Zoom Link
                  </a>         
                </v-card-title>
              </v-card>

            </div>

            
        </v-card>
          
        <v-card
        v-if="isInQueue"
          width="600"
          class="mx-auto my-auto"
        >
            <v-card-title class="black--text accent">
              <h1 class="mx-auto" id="welcome">
                Welcome, {{name}}
              </h1>         
            </v-card-title>

            <v-divider></v-divider>

            <div style="padding: 20px">
              <h3 align="center">Your place in line is: {{place}}</h3>
              <h3 align="center">Estimated wait time: {{waitTimeToString(waitTime)}}</h3>

              <div align="center" style="margin: 10px">
                <v-btn class="mx-auto" color="error"> 
                  Leave queue
                </v-btn>

              </div>
              
            </div>

        </v-card>
    </v-app>
</template>

<script>
export default {
  name: 'Queue',

  components: {

  },

  data: () => ({
      hasAppointment: true,
      isInQueue: false,
      name: "Nicky",
      appointmentTime: "7:00pm",
      link: "https://www.google.com",
      place: 10,
      waitTime: 3200

  }),

  methods: {
    waitTimeToString(seconds) {
      if (seconds < 3600) {
        return Math.ceil(seconds / 60) + " minutes";
      }
      else {
        return Math.ceil(seconds / 3600) + " hours";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.v-text {
  font-size: 30px;
}
</style>
