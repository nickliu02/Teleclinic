<template>
    <v-app>
        <v-navigation-drawer 
        permanent
        app
        color="primary"
        dark
        expand-on-hover
        >
        
            <v-list-item two-line>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        Teleclinic
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-divider light=false></v-divider>

        </v-navigation-drawer>
        

        <router-view></router-view>
    </v-app>
</template>

<script>
export default {
  name: 'Navbar',

  components: {
   
  },

  data: () => ({
    
    
  }),

  methods: {
      
  }
};
</script>