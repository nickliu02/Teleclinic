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
                Your appointment is at {{toToDfromTimestamp(appointmentInfo.start)}}.
              </h3>
              
              <v-spacer></v-spacer>

              <h3 align="center">
                Join call: 
              </h3>

              <v-card width="300" class="mx-auto" raised style="margin: 10px">
                <v-card-title class="black--text">
                  <a v-bind:href="appointmentInfo.zoom_link" target="_blank" 
                    class="mx-auto" id="welcome"
                    style="text-decoration:none"  
                    
                    
                  >
                    Zoom Link
                  </a>         
                </v-card-title>
              </v-card>

              <h3 align="center">
                Password to join: {{appointmentInfo.password}}
              </h3>

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
                <v-btn class="mx-auto" color="error" @click="leaveQueue()"> 
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
              <h3 align="center">There are {{num}} people in the queue.</h3>
              <h3 align="center">Estimated wait time: {{waitTimeToString(getWaitTime())}}</h3>

              <div align="center" style="margin: 10px">
                <v-btn class="mx-auto" color="primary" @click="enterQueue()"> 
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
      
      queueInfo: {

      },

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
      num: Math.ceil(Math.random() *5),
      place: 0,

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
      return (this.num-1 ) * 1800;
    },

    async getPlaceInQueue() {
      const info = await this.$axios.post(this.$API_URL+"/queue/get", 
        {
          email: localStorage.getItem('email'),
          queue: true
        },

        {
            headers: {'x-access-token': localStorage.getItem('jwt')}
        })
        .then(r => {
          console.log(r.data)
        })
        .catch(e => {
            console.log(e);
        });

        console.log(info);

    },

    async enterQueue() {
      this.isInQueue = true;
      this.place = this.num + 1;


      const info = await this.$axios.post(this.$API_URL+"/queue/add",
            {
              doctor_email: "",
              details: "",
              start: Date.now() / 1000,
              finish: (Date.now() / 1000) + 24*3600,
              name: "Doctor's Appointment",
              timed: true,
              color: ""

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
      this.isInQueue = false;

      const info = await this.$axios.post(this.$API_URL+"/queue/delete",
            {
              email: localStorage.getItem('email'),
              queue: true
            },

            {
              headers: {'x-access-token': localStorage.getItem('jwt')
            }
        }).then(r=>{
          console.log(r);
        }) 
        .catch(e => {
            console.log(e);
        });

      console.log(info);
    },

    async getAppointment() {
       let token = localStorage.getItem("jwt")
       let dat = await this.$axios.get(this.$API_URL+"/appointments/get",{
          headers: {"x-access-token":token}}).catch(e => console.log(e))

        const eveT = [];
        dat.data.forEach(doc=>{
          let appData = doc
          let event = {
            start: appData.start*1000,
            zoom_link: appData.join_url,
            password: appData.password
           
           }
          eveT.push(event)
        })

        let currentDate = new Date().toISOString().substr(0, 10);
        let correct = null;

        for (let i = 0; i < eveT.length; i++) {
          let appointment = eveT[i];
          let date = this.toDatefromTimestamp(appointment.start);
          console.log(date, currentDate)

          if (date == currentDate) {
            correct = appointment;
          }
          
        }

        this.appointmentInfo = correct;
        this.hasAppointment = correct != null;
        console.log(correct);
    },


    toDatefromTimestamp(ts){
        let d = new Date(ts)
        let dat = ""+d.getDate()
        let mon = ""+(d.getMonth()+1)
        if (dat.length==1){
          dat = "0"+dat
        }
        if(mon.length==1){
          mon="0"+mon
        }
        return d.getFullYear()+"-"+mon+"-"+dat
      },

      toToDfromTimestamp(ts){
        let d = new Date(ts)
        let dL = d.toTimeString().split(":")
        let hr = parseInt(dL[0],10)
        let curPeriod = "AM"
        if(hr<=23 && hr>=12){
          curPeriod = "PM"
        }
        if(hr>12){
          hr-=12
        }
        let h = hr.toString()
        return h+":"+dL[1]+" "+curPeriod
      },

  },


  

  mounted() {
      this.getPlaceInQueue();
      this.getAppointment();
      
  }
};
</script>

<style lang="scss" scoped>
.v-text {
  font-size: 30px;
}
</style>
