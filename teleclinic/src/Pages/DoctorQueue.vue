<template>
  <v-app :style="{background: '#eee'}">
      <v-row class="mx-auto my-auto">
        <v-card
          width="300"
          class="ma-10"
          height="600"
          
        >
            <v-card-title class="black--text accent">
              <h1 class="mx-auto" id="welcome">
                Appointments
              </h1>        
            </v-card-title>

            <v-virtual-scroll
                    :items="appointments"
                    :item-height="50"
              > 
                  <template v-slot="{ item }">
                    <v-list-item>

                      <v-list-item-content>
                        <v-list-item-title>
                            {{ item.first_name + " " + item.last_name}}

                            <span style="font-weight: bold">{{toToDfromTimestamp(item.start)}}</span>

                        </v-list-item-title>
                        
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-btn
                          depressed
                          small
                          @click="openAppointmentsModal(item)"
                        >
                          View
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </template>

                </v-virtual-scroll> 

            
        </v-card>

        <v-card
          width="300"
          class="ma-10"
          height="600"
        >
            <v-card-title class="black--text accent">
              <h1 class="mx-auto" id="welcome">
                Walk-ins
              </h1>         
            </v-card-title>

            <v-virtual-scroll
                    :items="walk_ins"
                    :item-height="50"
              > 
                  <template v-slot="{ item }">
                    <v-list-item>

                      <v-list-item-content>
                        <v-list-item-title>
                            {{ item.first_name + " " + item.last_name}}

                        </v-list-item-title>
                        
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-btn
                          depressed
                          small
                          @click="openWalkInModal(item)"
                        >
                          View
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </template>

                </v-virtual-scroll> 

            
        </v-card>

      </v-row>

      <v-dialog
          max-width="350"
          v-model="appointmentModalOpen"
        >

          <v-card>
            <v-card-title class="headline justify-center">
                Appointment Details
            </v-card-title>
              
                 
          </v-card>
        </v-dialog>

      
  </v-app>
</template>

<script>
export default {
    name: "DoctorQueue",
    data() {
        return {
            appointments: [
                {
                    id: "25",   
                    name: "Doctor’s Appointment", 
                    details: "Purpose of appointment", 
                    start: Date.now(),
                    end: Date.now() + 100000,
                    color: "red",
                    zoom_link: "https://www.google.com",
                    first_name: "ayy",
                    last_name: "lmao",
                },
            ],

            walk_ins: [
                {
                    first_name: "lol",
                    last_name: "xd",
                    email: "lol@lol.com"
                },
            ],

            modalInfo: {},
            appointmentModalOpen: false,
            walkInModalOpen: false,
        }
    },
    methods: {
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

        openAppointmentsModal(info) {
            this.modalInfo = info;
            this.appointmentModalOpen = true;
        },

        openWalkInModal(info) {
            this.modalInfo = info;
            this.walkInModalOpen = true;
        }
        
    },

    mounted() {
        for (let i = 0; i < 3; i++) {
            this.appointments.push(this.appointments[0]);
            this.walk_ins.push(this.walk_ins[0]);
        }
    },

    components: {
  
    }
    
}
</script>

<style>

</style>