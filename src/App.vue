<template>
  <ice-earth :show-toolbar="false">
    <ice-toolbar></ice-toolbar>
  </ice-earth>

  <ice-header-3 logo="https://cdn.jsdelivr.net/gh/hfxtsk/cdn/hfxtsk.cn/logo/logo.svg">
    <ice-menu-2 @active="active">
      <ice-menu-item key="video">
        <ice-icon icon="ant-design:home-outlined" />
        监控视频
      </ice-menu-item>
      <ice-sub-menu>
        <template #title>
          <ice-icon icon="icon-park-outline:abnormal" />
          菜单3
        </template>
        <ice-menu-item-group>
          <template #title>Item 1</template>
          <ice-menu-item key="setting:1">
            <ice-icon icon="icon-park-outline:ad-product" />
            Option 1
          </ice-menu-item>
          <ice-menu-item key="setting:2">
            <ice-icon icon="icon-park-outline:adobe-illustrate" />
            Option 2
          </ice-menu-item>
        </ice-menu-item-group>
        <ice-menu-item-group>
          <template #title>Item 2</template>
          <ice-menu-item key="setting:3">
            <ice-icon icon="icon-park-outline:airplane-window" />
            Option 3
          </ice-menu-item>
          <ice-menu-item key="setting:4">
            <ice-icon icon="icon-park-outline:align-bottom-two" />
            Option 4
          </ice-menu-item>
        </ice-menu-item-group>
      </ice-sub-menu>
      <ice-sub-menu>
        <template #title>Navigation Three - Submenu</template>
        <ice-menu-item key="setting:5">
          <ice-icon icon="icon-park-outline:add-subtract" />
          Option 3
        </ice-menu-item>
        <ice-menu-item key="setting:6">
          <ice-icon icon="icon-park-outline:airplane-window-one" />
          Option 4
        </ice-menu-item>
      </ice-sub-menu>
    </ice-menu-2>
    <template #right>
      <ice-weather></ice-weather>
      <ice-clock :font-size="18" style="margin-right: 10px"></ice-clock>
      <ice-icon icon="carbon:user-avatar-filled-alt" :size="40"></ice-icon>
    </template>
  </ice-header-3>
  <ice-menu></ice-menu>
  <ice-wrapper-2 direction="left" :visible="false">
    <ice-wrapper-item>
      <ice-panel title="饼图" style="width: 100%; height: 100%">
        <ice-chart-pie :data="pieData"></ice-chart-pie>
      </ice-panel>
    </ice-wrapper-item>
    <ice-wrapper-item>
      <ice-panel title="视频" style="width: 100%; height: 100%">
        <ice-media :source="{ url: 'http://192.168.0.19/pkgs/video.MP4' }"></ice-media>
        <ice-number-flop :number="numberFlop" :digits="3"></ice-number-flop>
      </ice-panel>
    </ice-wrapper-item>
  </ice-wrapper-2>
  <ice-wrapper-2 direction="right" :visible="false">
    <ice-wrapper-item>
      <ice-panel title="柱状图" style="width: 100%; height: 100%">
        <ice-chart-bar type="battery"></ice-chart-bar>
      </ice-panel>
    </ice-wrapper-item>
    <ice-wrapper-item>
      <ice-panel title="折线图" style="width: 100%; height: 100%">
        <ice-chart-line></ice-chart-line>
      </ice-panel>
    </ice-wrapper-item>
  </ice-wrapper-2>
  <ice-wrapper-2 direction="down" :visible="false">
    <ice-wrapper-item>
      <ice-panel title="标题" style="width: 100%; height: 100%">
        <ice-list />
      </ice-panel>
    </ice-wrapper-item>
  </ice-wrapper-2>
  <ice-dialog title="视频" :width="1000" :top="50" :right="10" v-model:visible="showvideo">
    <ice-split-screen v-if="showvideo" :source="urls"></ice-split-screen>
  </ice-dialog>
  <div class="number-flop">
    <ice-number-flop :number="numberFlop" :digits="6"></ice-number-flop>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import IceWeather from '~/IceWeather/index.vue'

const pieData = ref([
  {
    name: '普通组件',
    value: 30
  },
  {
    name: 'GIS组件',
    value: 20
  },
  {
    name: 'Admin组件',
    value: 18
  },
  {
    name: '扩展组件',
    value: 10
  }
])
const urls = [
  {
    name: '摄像头',
    type: 'flv',
    url: 'http://192.168.0.55:8866/live?url=rtsp://admin:hfxtsk1907@192.168.0.64:554/h264/ch1/sub/av_stream'
  },
  {
    name: 'mp4',
    url: 'http://192.168.0.19/pkgs/video.MP4'
  }
]
const showvideo = ref(false)
function active(params: string) {
  const funmap = {
    video: () => {
      showvideo.value = true
    }
  }
  funmap[params]()
}

const numberFlop = ref(22)
setTimeout(() => {
  numberFlop.value = 59
}, 2000)
// setInterval(() => {
//   numberFlop.value++
//   // numberFlop.value = Math.floor(Math.random() * 10000)
// }, 2000)
</script>
<style lang="less">
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  position: relative;
  overflow: hidden;
  user-select: none;
}
.number-flop {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
