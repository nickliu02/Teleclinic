import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { colors } from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#4ABDAC", //Where u change colours
                secondary: "FC4A1A",
                accent: "F7B733",
                error: colors.red.accent3,
                success: colors.blue.base
            }
        }
    },
});
