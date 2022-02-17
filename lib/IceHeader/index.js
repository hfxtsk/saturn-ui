import { defineComponent, openBlock, createElementBlock, createElementVNode, toDisplayString } from 'vue';

const _hoisted_1 = { class: "ice-header" };
const __default__ = { name: 'IceHeader' };
var script = defineComponent({
    ...__default__,
    props: {
        title: {
            type: String,
            required: false,
            default: '可视化数据展示平台'
        }
    },
    setup(__props) {
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("div", _hoisted_1, [
                createElementVNode("div", null, toDisplayString(__props.title), 1)
            ]));
        };
    }
});

script.__file = "packages/IceHeader/index.vue";

const withInstall = (component, alias) => {
    const comp = component;
    comp.install = (app) => {
        app.component(comp.name || comp.displayName, component);
        if (alias) {
            app.config.globalProperties[alias] = component;
        }
    };
    return component;
};

const IceHeader = withInstall(script);
const InIceHeader = IceHeader;

export { IceHeader, InIceHeader as default };
