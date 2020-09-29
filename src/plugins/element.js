import Vue from 'vue'
import {
  // 容器
  Container,
  // 布局
  Row,
  Col,
  Header,
  Main,
  Footer,
  // 控件
  Button,
  Form,
  FormItem,
  Input,
  Menu,
  MenuItem,
  Dialog,
  Message
} from 'element-ui'

Vue.use(Container)
Vue.use(Row)
Vue.use(Col)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Dialog)
// 导入弹框提示组件
Vue.prototype.$rootMessage = Message
