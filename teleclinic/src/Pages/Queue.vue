<template>
    <v-app :style="{background: '#eee'}">
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
              <h3 align="center">Estimated wait time: {{waitTimeToString(getWaitTime())}}</h3>

              <div align="center" style="margin: 10px">
                <v-btn class="mx-auto" color="error"> 
                  Leave queue
                </v-btn>

              </div>
              
            </div>

        </v-card>


        <v-card
        v-if="!isInQueue && !hasAppointment"
          width="600"
          class="mx-auto my-auto"
        >
            <v-card-title class="black--text accent">
              <h1 class="mx-auto" id="welcome">
                Welcome
              </h1>         
            </v-card-title>

            <v-divider></v-divider>

            <div style="padding: 20px">
              <h3 align="center">There are {{}} people in the queue.</h3>
              <h3 align="center">Estimated wait time: {{waitTimeToString(getWaitTime())}}</h3>

              <div align="center" style="margin: 10px">
                <v-btn class="mx-auto" color="primary"> 
                  Join queue
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
      hasAppointment: false,
      isInQueue: false,
      

      appointmentInfo: {
        id: "",   
        name: "", 
        details: "", 
        start: 0,
        end: 0,
        color: "",
        zoom_link: "",
        first_name: "",
        last_name: ""
      },

      place: -1,

  }),

  methods: {
    waitTimeToString(seconds) {
      if (seconds < 3600) {
        return Math.ceil(seconds / 60) + " minutes";
      }
      else {
        return Math.ceil(seconds / 3600) + " hours";
      }
    },

    getWaitTime() {
      return 0;
    },

    async getPlaceInQueue() {
      const info = await this.$axios.get(this.$API_URL+"/queue/place", {
            headers: {'x-access-token': localStorage.getItem('jwt')}
        })
        .catch(e => {
            console.log(e);
        });

        console.log(info);

          //this.queueInfo = info.data;
    },

    async enterQueue() {
      const info = await this.$axios.post(this.$API_URL+"/queue/enter",
            {
              email: localStorage.getItem('email')
            },

            {
              headers: {'x-access-token': localStorage.getItem('jwt')
            }
        }).then(r=>{
          console.log(r);
          this.isInQueue = true;
        }) 
        .catch(e => {
            console.log(e);
        });


        console.log(info);
    },

    async leaveQueue() {
      const info = await this.$axios.post(this.$API_URL+"/queue/exit",
            {
              email: localStorage.getItem('email')
            },

            {
              headers: {'x-access-token': localStorage.getItem('jwt')
            }
        }).then(r=>{
          console.log(r);
          this.isInQueue = true;
        }) 
        .catch(e => {
            console.log(e);
        });

      console.log(info);
    }
  },

  mounted() {
      this.getPlaceInQueue();
      
  }
};
</script>

<style lang="scss" scoped>
.v-text {
  font-size: 30px;
}
</style>
