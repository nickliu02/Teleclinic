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
            <v-divider light></v-divider>

            <v-list
                dense
                nav
            >
                <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    link
                    :to="item.route"
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>


                <v-list-item 
                    @click="logOut()"
                >
                    <v-list-item-icon>
                        <v-icon>{{ mdiLogoutVariant }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

        </v-navigation-drawer>
        

        <router-view></router-view>
    </v-app>
</template>

<script>
import { mdiCalendarMonthOutline,  mdiHumanQueue,
mdiLogoutVariant, mdiBookInformationVariant  } from '@mdi/js';

export default {
  name: 'Navbar',

  components: {
   
  },

  data: () => ({
    items: [
      { title: "Appointments", icon: mdiCalendarMonthOutline, route: "/appointments" },
      { title: "Queue", icon: mdiHumanQueue, route: localStorage.getItem('isDoctor') == true ? "/doctor_queue": "/queue" },
      { title: "Personal Info", icon: mdiBookInformationVariant, route: "/personal_info" },
    ],

    mdiLogoutVariant: mdiLogoutVariant,
    
  }),

  methods: {
      logOut() {
          localStorage.removeItem('jwt');
          localStorage.removeItem('code_sent')
          this.$router.push('Login');
      }
  }
};
</script>