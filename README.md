# SaturnUI

🪐 一款轻量级、模块化的Web可视化UI组件库（含大屏模块，GIS模块，Admin模块） 👍

## 使用文档

- **[在线文档](http://saturn.hfxtsk.cn/)**

## 安装

```Basic
npm i saturn-ui@latest
```

### 使用

```JavaScript
import { createApp } from "vue";
import App from "./App.vue";
import SaturnUI from "saturn-ui";
import "saturn-ui/lib/theme-default/index.css";

const app = createApp(App);
app.use(SaturnUI);
app.mount("#app");
```

- 👉 在[快速开始](https://saturn.hfxtsk.cn/doc/start) 中查看更多信息。

## 项目文档

- [Explain.md](./Explain.md)

## License

- [MIT](https://github.com/hfxtsk/saturn-ui/blob/main/LICENSE)
- Copyright (c) 2019-present hfxtsk.cn
