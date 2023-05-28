import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import Tree from 'primevue/tree'
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'
import ScrollPanel from 'primevue/scrollpanel'
import Dialog from 'primevue/dialog'
import Divider from 'primevue/divider'
import SpeedDial from 'primevue/speeddial'
import Toast from 'primevue/toast'
import Dropdown from 'primevue/dropdown'
import InputSwitch from 'primevue/inputswitch'
import InputNumber from 'primevue/inputnumber'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmationService from 'primevue/confirmationservice'
import 'primevue/resources/primevue.min.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.component('Splitter', Splitter)
app.component('SplitterPanel', SplitterPanel)
app.component('Tree', Tree)
app.component('Toolbar', Toolbar)
app.component('Button', Button)
app.component('ScrollPanel', ScrollPanel)
app.component('Dialog', Dialog)
app.component('Divider', Divider)
app.component('SpeedDial', SpeedDial)
app.component('Toast', Toast)
app.component('Dropdown', Dropdown)
app.component('InputSwitch', InputSwitch)
app.component('InputNumber', InputNumber)
app.component('ConfirmDialog', ConfirmDialog)

app.use(router)
app.use(store)
app.use(PrimeVue)
app.use(ToastService)
app.use(ConfirmationService)
app.mount('#app')
