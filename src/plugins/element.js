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
  Breadcrumb,
  BreadcrumbItem,
  Switch,
  Popconfirm,
  Tooltip,
  Button,
  Form,
  FormItem,
  Table,
  TableColumn,
  Pagination,
  Input,
  Select,
  Option,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Tag,
  Image,
  Upload,
  Divider,
  Loading,
  Dialog,
  Card,
  Popover,
  Message,
  MessageBox
} from 'element-ui'

Vue.use(Container)
Vue.use(Row)
Vue.use(Col)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Switch)
Vue.use(Popconfirm)
Vue.use(Tooltip)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Tag)
Vue.use(Image)
Vue.use(Upload)
Vue.use(Divider)
Vue.use(Loading)
Vue.use(Dialog)
Vue.use(Card)
Vue.use(Popover)
// 导入弹框提示组件
Vue.prototype.$rootMessage = Message
// 导入Dialog组件
Vue.prototype.$confirm = MessageBox
