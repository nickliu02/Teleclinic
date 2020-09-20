<template>
  <v-row class="fill-height ml-15">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn color="primary" class="mr-4" @click="setDialogTrue()" dark>
            Add Appointment
          </v-btn>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev" >
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next" class="mr-4">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>

      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-container>
            <v-form ref="form" @submit.prevent="addAppointment">
                <h1 style ="text-align:center;">Make Appointment</h1>
                <v-text-field v-model="form.reason" :rules=[rules.required]  type="text" label="Reason for Appointment (required)"></v-text-field>

                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="form.date" :rules=[rules.required] label="Date: (required) - Please enter a present/future date" readonly v-bind="attrs" v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="form.date"  no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false;">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(checkDate(form.date))">OK</v-btn>
                  </v-date-picker>
                </v-menu>

                <v-select v-model="form.timeSelected" :items="availableT" label="Select Available Time (required)" :rules=[rules.required] @click="getTimes(form.date)" dense solo></v-select>
                <div style = "text-align:center;">
                  <v-btn type="submit" color="primary" class="mr-4" @click.stop="submitDialog()">Create Appointment</v-btn>
                </div>
            </v-form>
          </v-container>
        </v-card>

      </v-dialog>

      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-btn icon @click="deleteEvent(selectedEvent.id)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      rules: {
        required: value => !!value || 'Required',

      },
      form: {
        date: new Date().toISOString().substr(0, 10),
        reason: null,
        timeSelected: null
      },
      newAppointment: {
        name: null,
        details: null,
        start: null,
        finish: null,
        timed: true,
        color: "primary",
        doctor_email: "kathrikai30201094@gmail.com"
      },
      today: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      name:null,
      start:null,
      end:null,
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      times: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM', '3:00 PM', '3:30 PM','4:00 PM','4:30 PM','5:00 PM'],
      availableT: [],
      myForm:{appointment_id: null},

      dialog: false,
      dialogDate: false,

      meetingST: []
    }),

    mounted () {
      this.getAppointments()

    },

    methods: {

      async getAppointments(){//individual appointments onlylet snapshot =
        // let snapshot = awuait db.collection('calEvent').get()
        let token = localStorage.getItem("jwt")
        let dat = await this.$axios.get(this.$API_URL+"/appointments/get",{
          headers: {"x-access-token":token}}).catch(e => console.log(e))

        const eveT = [];

        dat.data.forEach(doc=>{
          let appData = doc
          let event = {id: appData.appointment_id,
            start: appData.start*1000,
            end:appData.finish*1000,
            details:appData.details,
             name: appData.name,
             timed: appData.timed,
             color: appData.color}
          eveT.push(event)
        })

        this.events = eveT


      },
      async addAppointment(){
        if(this.$refs.form.validate()){
          let timeL = this.form.timeSelected.split(" - ")
          let startT = timeL[0]
          let endT = timeL[1]

          let startTS = this.toTimestamp(this.form.date, startT)
          let endTS = this.toTimestamp(this.form.date,endT)
          let token = localStorage.getItem("jwt")
          let name = "Doctor's Appointment"
          let reason = this.form.reason


          this.newAppointment.start = Math.floor(startTS/1000);
          this.newAppointment.finish = Math.floor(endTS/1000);
          this.newAppointment.name = name
          this.newAppointment.details = reason

          const newAppointment = this.newAppointment
          await this.$axios.post(this.$API_URL+"/appointments/add",
            {
                  ...newAppointment
              }, {
                headers: {"x-access-token":token}})
          .catch(e => console.log(e))
          this.getAppointments()
          //send above variables + true
        }
      },
      async deleteEvent(ev){

        this.myForm.appointment_id = ev
        const myF = this.myForm;
        let token = localStorage.getItem("jwt")

        await this.$axios.post(this.$API_URL+"/appointments/delete",
          {
                ...myF
            }, {
              headers: {"x-access-token":token}})
        .catch(e => console.log(e))

        this.selectedOpen =  false;
        this.getAppointments();
      },
      async getTimes(date){
        let token = localStorage.getItem("jwt")
        let dat = await this.$axios.get(this.$API_URL+"/appointments/getTimes",{
          headers: {"x-access-token":token}}).catch(e => console.log(e))
        let STimes = [];

        dat.data.forEach(doc=>{
          STimes.push((doc.start*1000).toString());
        })
        this.meetingST = STimes;
        this.updateAvailableTimes(date)
      },
      setDialogTrue(){
        this.dialog=true;
        this.getTimes(this.form.date);
      },
      submitDialog(){
        if(this.$refs.form.validate()){
          this.dialog=false;
        }
      },
      toTimestamp(date,timem){
        let timemL = timem.split(" ")
        let time = timemL[0]
        let m = timemL[1]
        let dL = date.split("-")
        let tL = time.split(":")

        if(m=="PM"&& time.split(":")[0]!="12"){ tL[0] =  (parseInt(tL[0],10)+12).toString()}
        if(m=="AM"&&time=="12:00"){ tL[0] =  (parseInt(tL[0],10)+12).toString() }
        let timeS = new Date(Date.UTC(dL[0],dL[1]-1,dL[2],tL[0],tL[1]))
        return timeS.getTime().toString()
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
        return dat+'/'+mon+"/"+d.getFullYear()
      },

      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => this.selectedOpen = true, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      checkDate(dd){
        if(this.today<dd){
          this.form.date = dd
          return dd
        }
        else{
          this.form.date = this.today
          return this.today
        }
      },
      updateAvailableTimes(dat){

        let aMeetings = []
        for(var i = 0;i<this.times.length-1;i+=1){
          let startT = this.toTimestamp(dat,this.times[i]);

          if(!(this.meetingST.includes(startT))){
            if(Date.now()<=startT){
              aMeetings.push(this.times[i] + " - "+this.times[i+1])
            }
          }
        }
        this.availableT=aMeetings
      },

      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
    }
  }
</script>
