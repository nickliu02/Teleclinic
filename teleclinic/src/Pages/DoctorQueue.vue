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
                    height="536"
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
                    height="536"
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

            <v-container class="mx-auto my-auto">
                <p><b>Name:</b> {{ " " + modalInfo.first_name + " " + modalInfo.last_name }}</p>
                <p><b>Date:</b> {{ " " + toDatefromTimestamp(modalInfo.start) }}</p>
                <p><b>Time:</b> {{ " " + toToDfromTimestamp(modalInfo.start) }}</p>
                <p><b>Purpose:</b> {{ " " + modalInfo.details }}</p>
            </v-container>

            <v-card-actions class="justify-center">
                <v-btn
                    color="black"
                    text
                    align="right"
                    @click="appointmentModalOpen = false"
                >
                    back
                </v-btn>
                
                <a v-bind:href="this.modalInfo.join_url" style="text-decoration:none">
                    <v-btn
                        color="green darken-1"
                        text
                        align="right"
                        @click="openZoom()"
                        
                    >
                    start
                </v-btn>
              </a>
            </v-card-actions>
            
              
                 
          </v-card>
        </v-dialog>

        <v-dialog
          max-width="350"
          v-model="walkInModalOpen"
        >

          <v-card>
            <v-card-title class="headline justify-center">
                Walk
            </v-card-title>

            <v-container class="mx-auto my-auto">
                <h3 style="text-align:center">{{ modalInfo.first_name + " " + modalInfo.last_name }}</h3>
            </v-container>

            <v-card-actions class="justify-center">
                <v-btn
                    color="black"
                    text
                    align="right"
                    @click="walkInModalOpen = false"
                >
                    back
                </v-btn>

                <v-btn
                    color="green darken-1"
                    text
                    align="right"
                    
                >
                  start
              </v-btn>
            </v-card-actions>
            
              
                 
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
            
            ],

            walk_ins: [
                
            ],

            modalInfo: {},
            appointmentModalOpen: false,
            walkInModalOpen: false,
        }
    },
    methods: {
        toToDfromTimestamp(ts){
            let d = new Date(ts*1000)
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
        },

        toDatefromTimestamp(ts){
            let d = new Date(ts*1000)
            let dat = ""+d.getDate()
            let mon = ""+(d.getMonth()+1)
            if (dat.length==1){
            dat = "0"+dat
            }
            if(mon.length==1){
            mon="0"+mon
            }
            return dat+'/'+mon+"/"+d.getFullYear()
        },

        async getAppointments() {
            const info = await this.$axios.get(this.$API_URL+"/appointments/get", {
                headers: {'x-access-token': localStorage.getItem('jwt')}
            })
            .catch(e => {
                console.log(e);
            });

            console.log(info);

            this.appointments = info.data;
        },

        async getQueue() {
            const info = await this.$axios.get(this.$API_URL+"/appointments/get", {
                headers: {'x-access-token': localStorage.getItem('jwt')}
            })
            .catch(e => {
                console.log(e);
            });

            console.log(info);

            this.appointments = info.data;
        },
        
        async openZoom() {
            let token = localStorage.getItem('jwt')

            console.log(this.modalInfo)
            

            await this.$axios.post(this.$API_URL+"/appointments/delete",
            {
                    id: this.modalInfo.appointment_id
                }, {
                headers: {"x-access-token":token}})
            .then(r=> {
                console.log(r)
            })
            .catch(e => console.log(e))
        }
    },

    mounted() {
        this.getAppointments();
    },

    components: {
  
    }
    
}
</script>

<style>

</style>