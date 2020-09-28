import Vue from 'vue'
import {
  Container,
  Header,
  Main,
  Footer,
  Button,
  Form,
  FormItem,
  Input,
  Menu,
  MenuItem,
  Message
} from 'element-ui'

Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Menu)
Vue.use(MenuItem)
// 导入弹框提示组件
Vue.prototype.$rootMessage = Message
