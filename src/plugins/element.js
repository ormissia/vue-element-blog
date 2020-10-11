import Vue from 'vue'
import {
  // 容器
  Container,
  // 布局
  Row,
  Col,
  Aside,
  Header,
  Main,
  Footer,
  // 控件
  Switch,
  Popconfirm,
  Button,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dialog,
  Card,
  Message
} from 'element-ui'

Vue.use(Container)
Vue.use(Row)
Vue.use(Col)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Switch)
Vue.use(Popconfirm)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dialog)
Vue.use(Card)
// 导入弹框提示组件
Vue.prototype.$rootMessage = Message
