<template>
    <v-app :style="{background: '#eee'}">
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
                                Login
                            </v-card-title>

                            <v-card-text>
                                <v-form ref="form">
                                    <v-text-field
                                        label="Login"
                                        name="login"
                                        prepend-icon="mdi-account"
                                        color="success"
                                        type="text"
                                        v-model="form.email"
                                    >
                                    </v-text-field>

                                    <v-text-field
                                        id="password"
                                        label="Password"
                                        name="password"
                                        color="success"
                                        prepend-icon="mdi-lock"
                                        v-model="form.password"
                                        type="password"
                              
                                    ></v-text-field>

                                    
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="secondary" @click="onLogin">Log In</v-btn>
                                <v-btn color="accent" :to="registerR">Sign up here!</v-btn>
                            </v-card-actions>
                        </v-card>

                    </v-col>
                </v-row>
            </v-container>
        </v-main>



    </v-app>
</template>

<script>
export default {
    name: "Login",
    data(){
        return {
            form: {
                email : "",
                password : ""
            },
            
            registerR : "/register"
        }
    },
    methods : {
        onLogin(e){
            e.preventDefault()
            this.$router.push('/');
            let form = this.form;

            if (this.$refs.form.validate()) {
                 this.$axios.post(this.$API_URL+"/auth/login", {
                        ...form
                    })
                .then(response => {
                    console.log(response.data.accessToken)
                    if (typeof response.data.accessToken === 'string'){
                        localStorage.setItem('jwt',response.data.accessToken);
                        localStorage.setItem('isDoctor', response.data.isDoctor);
                        localStorage.setItem('email', form.email) ;
                        console.log(localStorage.getItem('isDoctor'));

                        if (localStorage.getItem('isDoctor') == "true"){
                            window.location = "https://zoom.us/oauth/authorize?client_id=zRlubaFlSqSKTLvRweygmg&response_type=code&redirect_uri=http%3A%2F%2Fteleclinic.netlify.app%2F";
                            
                        }
                        else {
                            this.$router.push('appointments');
                        }
                        
                        
                    }
                
                })
            }
            

            
        }
    }
}
</script>