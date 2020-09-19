<template>
    <v-app>
        <v-main>
            <v-container>
                <v-row
                    align="center"
                    justify="center"
                >
                    <v-col
                        cols="12"
                        sm="8"
                        md="4"
                    >
                        <v-card>
                            <v-card-title>
                                Register
                            </v-card-title>

                            <v-card-text>
                                <v-form>
                                    <v-text-field
                                        label="Email"
                                        name="email"
                                        color="success"
                                        
                                        prepend-icon="mdi-account"
                          
                                        type="text"
                                
                                        v-model="form.username"
                                        :rules="[rules.required, rules.emailRules]"
                                    >
                                    </v-text-field>
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
                                        id="password"
                                        label="Password"
                                        name="password"
                                    
                                        prepend-icon="mdi-lock"
                                        v-model="form.password"
                                        type="password"
                                        :rules="[rules.required, rules.min]"
                                    ></v-text-field>
                                    <v-text-field
                                        id="passwordconfirm"
                                        label="Confirm Password"
                                        name="passwordconfirm"
                                        color="success"
                                        
                                        prepend-icon="mdi-lock"
                                        v-model="form.otherpass"
                                        type="password"
                                        :rules="[rules.required, rules.min, rules.match]"
                                    ></v-text-field>

                                    <v-btn color="accent" @click="onRegister">Register</v-btn>

                                </v-form>
                            </v-card-text>
                        </v-card>

                    </v-col>
                </v-row>
            </v-container>
        </v-main>



    </v-app>
</template>

<script>

export default {
    name: "Register",
    data(){
        return {
            form : {
              username : "",
              first_name: "",
              middle_name: "",
              last_name: "",
              health_card_number: "",
              password : "",
              otherpass: ""
            },
            rules: {
              required: value => !!value || 'Required.',
              min: val => val.length >= 8 || 'Min 8 characters',
              min2: val => val.length >= 3 || 'Min 3 characters',
              match: val => val === this.form.password || 'Password must match',
              emailRules: v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email must be valid',
              healthCardRules: v => !v || /[1-9]\d{9}/.test(v) || 'Health card number must be valid',

              
            }
            
        }
    },
    
    methods : {
        onRegister(e){
            e.preventDefault()
            console.log("registering")
            const form = this.form;
            if (0 < form.username.length && form.username.length <= 12 && 0<form.password.length  && form.password.length<=12 && form.password===form.otherpass){
              this.$axios.post(this.$API_URL+"/auth/register", {
                          ...form
                      })
              .then(response => {
                  console.log(response.data.accessToken)
                  if (typeof response.data.accessToken === 'string'){
                    localStorage.setItem('jwt',response.data.accessToken)
                    
                    localStorage.setItem('username', form.username) 
                    if (localStorage.getItem('jwt') !== null){
                        
                        this.$router.push('Play')
                    
                    }
                  }
              })
              .catch(e => console.log(e))
            }

            
            
        }
    }
}
</script>