import { ref, computed, nextTick, watch, defineComponent, openBlock, createElementBlock, Fragment, createCommentVNode, createElementVNode, normalizeStyle, renderList, renderSlot, toDisplayString } from 'vue';

var Validator = {
    validPhone: /^1[3456789]\d{9}$/,
    validPwd: /^(?!_+$)(?!\d+$)(?!\D+$)[A-Za-z0-9]{6,12}$/i,
    validEmail: /^(\w|-)+@(\w|-)+(\.(\w|-)+)+$/i,
    validIdcard: /^((\d{18})|([0-9x]{18})|([0-9X]{18}))$/i,
    validImgs: /\.(svg|gif|png|jpe?g)$/i,
    validThousand: /(\d)(?=(\d{3})+$)/g,
    validThousandFloat: /(\d)(?=(\d{3})+\.)/g
};

const { validThousand, validThousandFloat } = Validator;
const IsType = (type, value) => Object.prototype.toString.call(value).slice(8, -1) === type;
const DeepCopyRA = (arg) => {
    const newValue = IsType('Object', arg)
        ? {}
        : IsType('Array', arg)
            ? []
            : IsType('Date', arg)
                ? new arg.constructor(+arg)
                : IsType('RegExp', arg) || IsType('Error', arg)
                    ? new arg.constructor(arg)
                    : arg;
    IsType('Object', arg) ||
        (IsType('Array', arg) &&
            Object.keys(arg).forEach(key => {
                newValue[key] = DeepCopyRA(arg[key]);
            }));
    return newValue;
};
const IsLeapyear = (num) => {
    if (!IsType('Number', num)) {
        throw new Error(`${num} is not number`);
    }
    return (num % 4 === 0 && num % 100 !== 0) || num % 400 === 0;
};
const FormatTime = (arg = new Date()) => {
    if (arg.trim() === '')
        throw new Error(`${arg} is not null`);
    const str = IsType('Number', arg) && String(arg).length < 13 ? arg * 1000 : arg;
    IsType('string', arg) && str.replace(/-/g, '/');
    const O = new Date(str);
    const doubleDigit = (num) => (num < 10 ? `0${num}` : String(num));
    const weeks = ['日', '一', '二', '三', '四', '五', '六'];
    const [Y, M, D, w, h, m, s] = [
        String(O.getFullYear()),
        doubleDigit(O.getMonth() + 1),
        doubleDigit(O.getDate()),
        `星期${weeks[O.getDay()]}`,
        doubleDigit(O.getHours()),
        doubleDigit(O.getMinutes()),
        doubleDigit(O.getSeconds())
    ];
    const date = `${Y}-${M}-${D}`;
    const time = `${h}:${m}:${s}`;
    const datetime = `${date} ${time}`;
    return { Y, M, D, w, h, m, s, date, time, datetime };
};
const CountDown = (num, format = 'hh:mm:ss') => {
    if (!IsType('Number', num))
        throw new Error(`${num} is not number`);
    if (!'DD:hh:mm:ss:ms'.includes(format)) {
        throw new Error(`${format} form error`);
    }
    const DD = ~~(num / (1000 * 60 * 60 * 24));
    let hh = ~~((num / (1000 * 60 * 60)) % 24);
    let mm = ~~((num / (1000 * 60)) % 60);
    let ss = ~~((num / 1000) % 60);
    let ms = ~~(num % 1000);
    const formatData = {};
    const doubleDigit = (digit) => (digit < 10 ? `0${digit}` : String(digit));
    format.includes('DD') ? (formatData.DD = doubleDigit(DD)) : (hh += DD * 24);
    format.includes('hh') ? (formatData.hh = doubleDigit(hh)) : (mm += hh * 60);
    format.includes('mm') ? (formatData.mm = doubleDigit(mm)) : (ss += mm * 60);
    format.includes('ss') ? (formatData.ss = doubleDigit(ss)) : (ms += ss * 1000);
    if (format.includes('ms')) {
        const curMs = format.includes('mm') ? doubleDigit(ms) : num;
        formatData.ms = +String(curMs).slice(0, 2);
    }
    return formatData;
};
const Throttle = (fn, time = 1000) => {
    let timer = null;
    return (e) => {
        !timer &&
            (timer = setTimeout(() => {
                fn(e);
                timer = null;
            }, time));
    };
};
const Debounce = (fn, time = 300) => {
    let timer;
    return (e) => {
        if (timer !== undefined)
            clearTimeout(timer);
        timer = setTimeout(() => {
            fn(e);
        }, time);
    };
};
const FormatThousand = (num) => {
    if (!IsType('Number', num))
        throw new Error(`${num} is not number`);
    const numStr = String(num);
    return numStr.replace(numStr.includes('.') ? validThousandFloat : validThousand, '$1,');
};
const Locked = (fn, time = 5000) => {
    let timer = null;
    const isLocked = { value: false };
    const isLockedProxy = new Proxy(isLocked, {
        get(obj, prop) {
            return obj[prop];
        },
        set(obj, prop, value) {
            obj[prop] = value;
            if (value) {
                timer = setTimeout(() => {
                    obj[prop] = false;
                }, time);
            }
            else {
                clearInterval(timer);
            }
            return true;
        }
    });
    return (e) => {
        !isLockedProxy.value &&
            fn(e, (value) => {
                isLockedProxy.value = value;
            });
    };
};
const AddZero = (str, float1, float2) => str + new Array(Math.abs(float1 - float2) + 1).join('0');
const Calculation = (num1, num2) => {
    if (!IsType('Number', num1) || !IsType('Number', num2)) {
        throw new Error(`${num1} or ${num2} is not number`);
    }
    const list1 = String(num1).split('.');
    const list2 = String(num2).split('.');
    const float1 = list1[1]?.length ?? 0;
    const float2 = list2[1]?.length ?? 0;
    float1 < float2 && (list1[1] = AddZero(list1[1], float1, float2));
    float1 > float2 && (list2[1] = AddZero(list2[1], float1, float2));
    const newNum1 = +list1.join('');
    const newNum2 = +list2.join('');
    const maxFloat = Math.max(float1, float2);
    const add = () => (newNum1 + newNum2) / 10 ** maxFloat;
    const subtract = () => (newNum1 - newNum2) / 10 ** maxFloat;
    const multiply = () => (newNum1 * newNum2) / 10 ** (maxFloat * 2);
    const divide = () => newNum1 / newNum2;
    return { add, subtract, multiply, divide };
};
const GenerateRandom = () => +new Date() + String.prototype.slice.call(Math.random(), 2, 7);
const Retarder = (time = 500) => new Promise(resolve => {
    setTimeout(() => {
        resolve(true);
    }, time);
});
var API$1 = {
    IsType,
    DeepCopyRA,
    IsLeapyear,
    FormatTime,
    CountDown,
    Throttle,
    Debounce,
    FormatThousand,
    Locked,
    AddZero,
    Calculation,
    GenerateRandom,
    Retarder
};

const useHandler = (props, emit) => {
    const scrollBarHeight = ref(0);
    const scrollTranslateY = ref(0);
    const listData = ref([]);
    const startIndex = ref(0);
    const endIndex = ref(0);
    const nodes = [];
    const prevScreen = computed(() => props.remain * props.screen[0]);
    const nextScreen = computed(() => props.remain * props.screen[1]);
    const prevCount = computed(() => Math.min(startIndex.value, prevScreen.value));
    const nextCount = computed(() => Math.min(props.list.length - endIndex.value, nextScreen.value));
    const renderData = computed(() => listData.value.slice(startIndex.value - prevCount.value, endIndex.value + nextCount.value));
    const updateHeight = () => {
        nextTick(() => {
            if (props.itemHeight === 0) {
                nodes.forEach(node => {
                    const { height } = node.getBoundingClientRect();
                    const index = +node.dataset.index;
                    const oldHeight = listData.value[index].height;
                    height && oldHeight !== height && (listData.value[index].height = height);
                });
            }
            scrollBarHeight.value = listData.value.reduce((prev, item) => prev + item.height, 0);
        });
    };
    let onScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.target;
        if (props.itemHeight) {
            startIndex.value = ~~(scrollTop / props.itemHeight);
            endIndex.value = startIndex.value + props.remain;
            scrollTranslateY.value = (startIndex.value - prevCount.value) * props.itemHeight;
        }
        else {
            let prevSum = 0;
            const index = listData.value.findIndex(item => {
                prevSum += item.height;
                return prevSum > scrollTop;
            });
            startIndex.value = index;
            endIndex.value = startIndex.value + props.remain;
            let curPrevSum = 0;
            const maxindex = startIndex.value - prevCount.value;
            listData.value.find((item, i) => {
                if (i >= maxindex) {
                    return true;
                }
                curPrevSum += item.height;
                return false;
            });
            scrollTranslateY.value = curPrevSum;
            updateHeight();
        }
        nextTick(() => {
            scrollTop + clientHeight >= scrollHeight - props.distance && emit('on-load-more');
        });
    };
    onScroll = Throttle(onScroll, props.interval);
    const setItemRef = (el, index) => {
        el && (nodes[index] = el);
    };
    watch(() => props.list, value => {
        const height = props.itemHeight || 100;
        listData.value = value.map((item, virtualId) => ({ ...item, virtualId, height }));
        updateHeight();
    }, { deep: true, immediate: true });
    return { scrollBarHeight, scrollTranslateY, renderData, onScroll, setItemRef };
};

var script$3 = defineComponent({
    name: 'IceVirtualList',
    emits: ['on-load-more'],
    props: {
        list: {
            type: Array,
            default: () => []
        },
        interval: {
            type: Number,
            default: 100
        },
        height: {
            type: String,
            default: '100%'
        },
        itemHeight: {
            type: Number,
            default: 0
        },
        distance: {
            type: Number,
            default: 50
        },
        screen: {
            type: Array,
            default: () => [1, 1]
        },
        remain: {
            type: Number,
            default: 8
        }
    },
    setup(props, { emit }) {
        const { scrollBarHeight, scrollTranslateY, renderData, onScroll, setItemRef } = useHandler(props, emit);
        return { scrollBarHeight, scrollTranslateY, renderData, onScroll, setItemRef };
    }
});

const _hoisted_1$3 = ["data-index"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock(Fragment, null, [
    createCommentVNode(" 虚拟列表 "),
    createElementVNode("div", {
      class: "ice-virtual-list",
      style: normalizeStyle(`height:${_ctx.height};`),
      onScrollPassive: _cache[0] || (_cache[0] = (...args) => (_ctx.onScroll && _ctx.onScroll(...args)))
    }, [
      createCommentVNode(" 滚动高度 "),
      createElementVNode("div", {
        class: "u-scroll-bar",
        style: normalizeStyle(`height:${_ctx.scrollBarHeight}px;`)
      }, null, 4 /* STYLE */),
      createCommentVNode(" 列表 "),
      createElementVNode("ul", {
        class: "m-list-scroll",
        style: normalizeStyle(`transform:translateY(${_ctx.scrollTranslateY}px);`)
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.renderData, (item) => {
          return (openBlock(), createElementBlock("li", {
            key: item.virtualId,
            "data-index": item.virtualId,
            ref_for: true,
            ref: $event => _ctx.setItemRef($event, item.virtualId)
          }, [
            renderSlot(_ctx.$slots, "default", { item: item })
          ], 8 /* PROPS */, _hoisted_1$3))
        }), 128 /* KEYED_FRAGMENT */))
      ], 4 /* STYLE */),
      renderSlot(_ctx.$slots, "more")
    ], 36 /* STYLE, HYDRATE_EVENTS */)
  ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
}

script$3.render = render;
script$3.__file = "packages/IceVirtualList/index.vue";

script$3.install = (app) => {
    app.component(script$3.name, script$3);
};
const InIceVirtualList = script$3;

const _hoisted_1$2 = { class: "ice-header" };
const __default__$2 = { name: 'IceHeader' };
var script$2 = defineComponent({
    ...__default__$2,
    props: {
        title: {
            type: String,
            required: false,
            default: '可视化数据展示平台'
        }
    },
    setup(__props) {
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("div", _hoisted_1$2, [
                createElementVNode("div", null, toDisplayString(__props.title), 1)
            ]));
        };
    }
});

script$2.__file = "packages/IceHeader/index.vue";

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

const IceHeader = withInstall(script$2);
const InIceHeader = IceHeader;

const _hoisted_1$1 = { class: "ice-header-2" };
const __default__$1 = { name: 'IceHeader2' };
var script$1 = defineComponent({
    ...__default__$1,
    props: {
        title: {
            type: String,
            required: false,
            default: '可视化数据展示平台'
        }
    },
    setup(__props) {
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("div", _hoisted_1$1, [
                createElementVNode("div", null, toDisplayString(__props.title), 1)
            ]));
        };
    }
});

script$1.__file = "packages/IceHeader2/index.vue";

const IceHeader2 = withInstall(script$1);
const InIceHeader2 = IceHeader2;

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

const IceMenu = withInstall(script);
const InIceMenu = IceMenu;

const Bind = (dom, event, fn, flag = false) => {
    dom.addEventListener(event, fn, flag);
    return dom;
};
const Unbind = (dom, event, fn, flag = false) => {
    dom.removeEventListener(event, fn, flag);
    return dom;
};
var BindEvent = {
    Bind,
    Unbind
};

var IceAPI = { ...API$1, ...BindEvent, Validator };

const components = [InIceVirtualList, InIceHeader, InIceHeader2, InIceMenu];
const API = { ...IceAPI, ...components };
const install = (app) => {
    components.forEach(component => app.component(component.name, component));
    Object.keys(API).forEach(key => {
        app.config.globalProperties[`$${key}`] = API[key];
    });
};
var index = {
    install,
    ...components
};

export { IceAPI, InIceHeader as IceHeader, InIceHeader2 as IceHeader2, InIceMenu as IceMenu, InIceVirtualList as IceVirtualList, index as default };
