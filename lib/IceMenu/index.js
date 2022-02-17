import { defineComponent, openBlock, createElementBlock, Fragment, renderList, createElementVNode, toDisplayString } from 'vue';

const _hoisted_1 = { class: "ice-menu" };
const _hoisted_2 = ["data-icon"];
const _hoisted_3 = { class: "title_tab" };
const __default__ = { name: 'IceMenu' };
var script = defineComponent({
    ...__default__,
    props: {
        data: {
            type: Array,
            required: true,
            default: () => [
                {
                    title: '菜单',
                    icon: 'icon-park-outline:application-menu',
                },
                {
                    title: '菜单',
                    icon: 'icon-park-outline:application-menu',
                },
                {
                    title: '菜单',
                    icon: 'icon-park-outline:application-menu',
                },
            ],
        },
    },
    setup(__props) {
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("div", _hoisted_1, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(__props.data, (item, index) => {
                    return (openBlock(), createElementBlock("div", { key: index }, [
                        createElementVNode("span", {
                            class: "iconify",
                            "data-icon": item.icon
                        }, null, 8, _hoisted_2),
                        createElementVNode("div", _hoisted_3, toDisplayString(item.title), 1)
                    ]));
                }), 128))
            ]));
        };
    }
});

script.__file = "packages/IceMenu/index.vue";

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

const IceMenu = withInstall(script);
const InIceMenu = IceMenu;

export { IceMenu, InIceMenu as default };
