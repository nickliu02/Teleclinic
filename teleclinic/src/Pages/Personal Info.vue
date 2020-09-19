<template>
    <v-app :style="{background: '#eee'}">
      <v-container class="mx-auto">
        
          
            <v-card width="700" class="mx-auto">
              <v-card-title class="black--text">
                <h2 class="mx-auto" id="welcome" style="font-weight: normal">
                  Personal Details
                </h2>         

                <v-btn class="mx-2" fab dark large color="cyan">
                  <v-icon dark>mdi-pencil</v-icon>
                </v-btn>
              </v-card-title>

              <v-divider></v-divider>

              <v-row
                justify="center"
                p="0"
              >
              
                <v-col
                  v-for="n in 4"
                  :key="n"
                >
                
                  <div v-if="n===1" style="color: #666">
                    <h4 style="font-weight: normal; margin-left: 60px">Last name</h4>
                  </div>

                  <div v-if="n===2">
                    <p>{{ last_name }}</p>
                  </div>

                  <div v-if="n===3" style="color: #666">
                    <h4 style="font-weight: normal; margin-left: 40px">First name</h4>
                  </div>

                  <div v-if="n===4">
                    <p style="margin-right: 20px">{{ first_name }}</p>
                  </div>
                  
                  
                </v-col>
              </v-row>

              <v-row
                justify="center"
                p="0"
              >
              
                <v-col
                  v-for="n in 4"
                  :key="n"
                
                >
                  <div v-if="n===1" style="color: #666">
                    <h4 style="font-weight: normal; margin-left: 60px">Email</h4>
                  </div>

                  <div v-if="n===2">
                    <p>{{ email }}</p>
                  </div>

                  <div v-if="n===3" style="color: #666">
                    <h4 style="font-weight: normal; margin-left: 40px">Phone number</h4>
                  </div>

                  <div v-if="n===4">
                    <p style="margin-right: 20px">{{ phone_number }}</p>
                  </div>
                  
                </v-col>
              </v-row>

              <v-row
                justify="center"
                p="0"
              >
              
                <v-col
                  v-for="n in 2"
                  :key="n"
                
                >
                  <div v-if="n===1" style="color: #666">
                    <h4 style="font-weight: normal; margin-left: 60px">Health Card Number</h4>
                  </div>

                  <div v-if="n===2">
                    <p style="font-weight: normal; margin-right: 360px">{{ health_card_number }}</p>
                  </div>
                  
                </v-col>
              </v-row>

    
            </v-card>
          
        
      </v-container>
    </v-app>
</template>

<script>
import { mdiPencil } from '@mdi/js';

export default {
  name: 'Personal_Info',

  components: {

  },

  data: () => ({
    last_name: "Liu",
    first_name: "Nick",
    email: "nickliu02@gmail.com",
    phone_number: "(403) 680-0666",
    health_card_number: "1234567890",


    mdiPencil: mdiPencil
  }),

  methods: {

  }
};
</script>
