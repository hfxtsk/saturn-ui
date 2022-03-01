# ice datav ui

一款轻量级、模块化基于Vue3+TypeScript的Web前端UI组件库（含大屏模块，GIS模块，Admin模块） 👍


## 使用文档

- **[产品手册](http://datav.hfxtsk.cn/)**

## 安装

```Basic
pnpm i ice-datav-ui@latest
```

### 使用

```JavaScript
import { createApp } from "vue";
import App from "./App.vue";
import IceDataV from "ice-datav-ui";
import "ice-datav-ui/lib/theme-default/index.css";

const app = createApp(App);
app.use(IceDataV);
app.mount("#app");
```

- 👉 在[快速开始](http://datav.hfxtsk.cn/doc/start) 中查看更多信息。

## 更新日志

- [CHANGELOG.md](./CHANGELOG.md)

## 贡献者

- 小冰cc\<xuxb@hfxtsk.cn\>
- ...

## License

- [MIT](./LICENSE)
- Copyright (c) 2019-present hfxtsk.cn
