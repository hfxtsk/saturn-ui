import { createApp } from 'vue'
import App from './App.vue'
import mars3d from './utils/mars3d'
import '@purge-icons/generated'

// 开发
import '~/theme-default/index.less'
import IceDataV from '~/index'

// 生产
// import 'ice-datav-ui/lib/theme-default/index.css'
// import IceDataV from 'ice-datav-ui/lib/index'

// 测试、生产环境，需要单独引入antdv
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'

// 测试
// import '#/theme-default/index.css'
// import IceDataV  from '#/index'

const app = createApp(App)
// app.use(Antd)

// 注册 mars3d
app.use(mars3d)
// 注册 IceDataV
app.use(IceDataV)

app.mount('#app')
