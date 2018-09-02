import Vue from 'vue'
import {
  Button,
  Col,
  DatePicker,
  Dialog,
  Form,
  FormItem,
  Input,
  Menu,
  MenuItem,
  Notification,
  Option,
  Pagination,
  Row,
  Select,
  Table,
  TableColumn,
} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

locale.use(lang)

Vue.use(Button)
Vue.use(Col)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Option)
Vue.use(Pagination)
Vue.use(Row)
Vue.use(Select)
Vue.use(Table)
Vue.use(TableColumn)

Vue.prototype.$notify = Notification
