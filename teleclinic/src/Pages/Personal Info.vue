<template>
    <v-app :style="{background: '#eee'}">
      <v-container class="mx-auto my-auto">
        
          
            <v-card width="400" class="mx-auto">
              <v-card-title class="black--text">
                <h2 id="welcome" style="font-weight: normal">
                  Personal Information
                </h2>         

                <v-btn class="mx-2" fab dark small color="cyan" align="right" style="position: absolute;
                    right: 0;
                    top: 0;
                    margin-top: 12px;
                    color: black;
                    "
                    @click="openEditModal()">
                  <v-icon dark>mdi-pencil</v-icon>
                </v-btn>
              </v-card-title>

              <v-divider></v-divider>

              
              <ul style="list-style-type: none; font-size: 18px; padding: 20px">
                <li><b>First name:</b> {{ info.first_name }}</li>
                <li><b>Last name:</b>  {{ info.last_name }}</li>
                <li><b>Email:</b>  {{ info.email }}</li>
                <li><b>Phone number:</b>  {{ info.phone_number }}</li>
                <li><b>Health card number:</b>  {{ info.health_card_number }}</li>
              </ul>
              
                

    
            </v-card>

        <v-dialog
          v-model="isEditModalOpen"
          max-width="500"
        >

          <v-card id="modal">
            <v-card-title class="headline justify-center">
                Update Information
            </v-card-title>
            <v-card-text>
              <v-form>
                  <v-text-field
                    color="success"
                      label="First Name"
                      name="first name"
                      
                      prepend-icon="mdi-form-textbox"
                      type="text"
                      
                      v-model="form.first_name"
                      :rules="[rules.required]"
                  >
                  </v-text-field>
                  <v-text-field
                    color="success"
                      label="Last Name"
                      name="last name"
                      
                      prepend-icon="mdi-form-textbox"
                      type="text"
                      
                      v-model="form.last_name"
                      :rules="[rules.required]"
                  >
                  </v-text-field>
                  <v-text-field
                    color="success"
                      label="Health Card Number"
                      name="health card number"
                      
                      prepend-icon="mdi-form-textbox"
                      type="text"
                      
                      v-model="form.health_card_number"
                      :rules="[rules.required, rules.healthCardRules]"
                  >
                  </v-text-field>
                  <v-text-field
                    color="success"
                      label="Phone number"
                      name="phone number"
                      
                      prepend-icon="mdi-form-textbox"
                      type="text"
                      
                      v-model="form.phone_number"
                      :rules="[rules.required, rules.phone_number]"
                  >
                  </v-text-field>


              </v-form>
          </v-card-text>


            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red darken-1"
                text
                @click="isEditModalOpen = false;"
              >
                  Cancel
              </v-btn>

              <v-btn
                color="green darken-1"
                text
                @click="isEditModalOpen = false;"
                
              >
                  Update
              </v-btn>
            </v-card-actions>
          </v-card>

          

        </v-dialog>
          
        
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
    info: {
      last_name: "Liu",
      first_name: "Nick",
      email: "nickliu02@gmail.com",
      phone_number: "(403) 680-0666",
      health_card_number: "1234567890"
    },

    mdiPencil: mdiPencil,

    isEditModalOpen: false,

    form: {
      email : "",
      first_name: "",
      last_name: "",
      health_card_number: "",
      phone_number: "",
    },
    rules: {
      required: value => !!value || 'Required.',
      emailRules: v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email must be valid',
      healthCardRules: v => !v || /[1-9]\d{9}/.test(v) || 'Health card number must be valid',
      phone_number: v => !v || /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(v) || "Phone number must be valid",
      
    }
  }),

  methods: {
    openEditModal() {
      this.isEditModalOpen = true;
      this.modalInfo = {
        last_name: this.last_name,
        first_name: this.first_name,
        email: this.email,
        phone_number: this.phone_number,
        health_card_number: this.health_card_number
      };
      this.form = this.modalInfo;
    },

    async getUserInfo() {
      const info = await this.$axios.get(this.$API_URL+"/info/profile", {
        headers: {'x-access-token': localStorage.getItem('jwt')}
      })
      .catch(e => {
        console.log(e);
      });

      this.info = info.data;
      }
  },

  onUpdate(e){
      e.preventDefault()
      console.log("update info")
      const form = this.form;
      if (this.$refs.form.validate()) {
          this.$axios.post(this.$API_URL+"/auth/update_info", {
                  ...form
              })
          .then(response => {
              console.log(response);
          })
          .catch(e => console.log(e))

      }
        
  },



  mounted() {
    this.getUserInfo();
  }
};
</script>
