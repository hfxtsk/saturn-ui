import{ref as e,computed as t,nextTick as r,watch as a,defineComponent as l,openBlock as n,createElementBlock as i,Fragment as s,createCommentVNode as o,createElementVNode as u,normalizeStyle as c,renderList as d,renderSlot as m,toDisplayString as v}from"vue";var h={validPhone:/^1[3456789]\d{9}$/,validPwd:/^(?!_+$)(?!\d+$)(?!\D+$)[A-Za-z0-9]{6,12}$/i,validEmail:/^(\w|-)+@(\w|-)+(\.(\w|-)+)+$/i,validIdcard:/^((\d{18})|([0-9x]{18})|([0-9X]{18}))$/i,validImgs:/\.(svg|gif|png|jpe?g)$/i,validThousand:/(\d)(?=(\d{3})+$)/g,validThousandFloat:/(\d)(?=(\d{3})+\.)/g};const{validThousand:g,validThousandFloat:p}=h,f=(e,t)=>Object.prototype.toString.call(t).slice(8,-1)===e,$=e=>{const t=f("Object",e)?{}:f("Array",e)?[]:f("Date",e)?new e.constructor(+e):f("RegExp",e)||f("Error",e)?new e.constructor(e):e;return f("Object",e)||f("Array",e)&&Object.keys(e).forEach((r=>{t[r]=$(e[r])})),t},y=(e,t=1e3)=>{let r=null;return a=>{!r&&(r=setTimeout((()=>{e(a),r=null}),t))}},b=(e,t,r)=>e+new Array(Math.abs(t-r)+1).join("0");var w={IsType:f,DeepCopyRA:$,IsLeapyear:e=>{if(!f("Number",e))throw new Error(`${e} is not number`);return e%4==0&&e%100!=0||e%400==0},FormatTime:(e=new Date)=>{if(""===e.trim())throw new Error(`${e} is not null`);const t=f("Number",e)&&String(e).length<13?1e3*e:e;f("string",e)&&t.replace(/-/g,"/");const r=new Date(t),a=e=>e<10?`0${e}`:String(e),[l,n,i,s,o,u,c]=[String(r.getFullYear()),a(r.getMonth()+1),a(r.getDate()),`星期${["日","一","二","三","四","五","六"][r.getDay()]}`,a(r.getHours()),a(r.getMinutes()),a(r.getSeconds())],d=`${l}-${n}-${i}`,m=`${o}:${u}:${c}`;return{Y:l,M:n,D:i,w:s,h:o,m:u,s:c,date:d,time:m,datetime:`${d} ${m}`}},CountDown:(e,t="hh:mm:ss")=>{if(!f("Number",e))throw new Error(`${e} is not number`);if(!"DD:hh:mm:ss:ms".includes(t))throw new Error(`${t} form error`);const r=~~(e/864e5);let a=~~(e/36e5%24),l=~~(e/6e4%60),n=~~(e/1e3%60),i=~~(e%1e3);const s={},o=e=>e<10?`0${e}`:String(e);if(t.includes("DD")?s.DD=o(r):a+=24*r,t.includes("hh")?s.hh=o(a):l+=60*a,t.includes("mm")?s.mm=o(l):n+=60*l,t.includes("ss")?s.ss=o(n):i+=1e3*n,t.includes("ms")){const r=t.includes("mm")?o(i):e;s.ms=+String(r).slice(0,2)}return s},Throttle:y,Debounce:(e,t=300)=>{let r;return a=>{void 0!==r&&clearTimeout(r),r=setTimeout((()=>{e(a)}),t)}},FormatThousand:e=>{if(!f("Number",e))throw new Error(`${e} is not number`);const t=String(e);return t.replace(t.includes(".")?p:g,"$1,")},Locked:(e,t=5e3)=>{let r=null;const a=new Proxy({value:!1},{get:(e,t)=>e[t],set:(e,a,l)=>(e[a]=l,l?r=setTimeout((()=>{e[a]=!1}),t):clearInterval(r),!0)});return t=>{!a.value&&e(t,(e=>{a.value=e}))}},AddZero:b,Calculation:(e,t)=>{if(!f("Number",e)||!f("Number",t))throw new Error(`${e} or ${t} is not number`);const r=String(e).split("."),a=String(t).split("."),l=r[1]?.length??0,n=a[1]?.length??0;l<n&&(r[1]=b(r[1],l,n)),l>n&&(a[1]=b(a[1],l,n));const i=+r.join(""),s=+a.join(""),o=Math.max(l,n);return{add:()=>(i+s)/10**o,subtract:()=>(i-s)/10**o,multiply:()=>i*s/10**(2*o),divide:()=>i/s}},GenerateRandom:()=>+new Date+String.prototype.slice.call(Math.random(),2,7),Retarder:(e=500)=>new Promise((t=>{setTimeout((()=>{t(!0)}),e)}))};var I=l({name:"IceVirtualList",emits:["on-load-more"],props:{list:{type:Array,default:()=>[]},interval:{type:Number,default:100},height:{type:String,default:"100%"},itemHeight:{type:Number,default:0},distance:{type:Number,default:50},screen:{type:Array,default:()=>[1,1]},remain:{type:Number,default:8}},setup(l,{emit:n}){const{scrollBarHeight:i,scrollTranslateY:s,renderData:o,onScroll:u,setItemRef:c}=((l,n)=>{const i=e(0),s=e(0),o=e([]),u=e(0),c=e(0),d=[],m=t((()=>l.remain*l.screen[0])),v=t((()=>l.remain*l.screen[1])),h=t((()=>Math.min(u.value,m.value))),g=t((()=>Math.min(l.list.length-c.value,v.value))),p=t((()=>o.value.slice(u.value-h.value,c.value+g.value))),f=()=>{r((()=>{0===l.itemHeight&&d.forEach((e=>{const{height:t}=e.getBoundingClientRect(),r=+e.dataset.index,a=o.value[r].height;t&&a!==t&&(o.value[r].height=t)})),i.value=o.value.reduce(((e,t)=>e+t.height),0)}))};let $=e=>{const{scrollTop:t,clientHeight:a,scrollHeight:i}=e.target;if(l.itemHeight)u.value=~~(t/l.itemHeight),c.value=u.value+l.remain,s.value=(u.value-h.value)*l.itemHeight;else{let e=0;const r=o.value.findIndex((r=>(e+=r.height,e>t)));u.value=r,c.value=u.value+l.remain;let a=0;const n=u.value-h.value;o.value.find(((e,t)=>t>=n||(a+=e.height,!1))),s.value=a,f()}r((()=>{t+a>=i-l.distance&&n("on-load-more")}))};return $=y($,l.interval),a((()=>l.list),(e=>{const t=l.itemHeight||100;o.value=e.map(((e,r)=>({...e,virtualId:r,height:t}))),f()}),{deep:!0,immediate:!0}),{scrollBarHeight:i,scrollTranslateY:s,renderData:p,onScroll:$,setItemRef:(e,t)=>{e&&(d[t]=e)}}})(l,n);return{scrollBarHeight:i,scrollTranslateY:s,renderData:o,onScroll:u,setItemRef:c}}});const D=["data-index"];I.render=function(e,t,r,a,l,v){return n(),i(s,null,[o(" 虚拟列表 "),u("div",{class:"ice-virtual-list",style:c(`height:${e.height};`),onScrollPassive:t[0]||(t[0]=(...t)=>e.onScroll&&e.onScroll(...t))},[o(" 滚动高度 "),u("div",{class:"u-scroll-bar",style:c(`height:${e.scrollBarHeight}px;`)},null,4),o(" 列表 "),u("ul",{class:"m-list-scroll",style:c(`transform:translateY(${e.scrollTranslateY}px);`)},[(n(!0),i(s,null,d(e.renderData,(t=>(n(),i("li",{key:t.virtualId,"data-index":t.virtualId,ref_for:!0,ref:r=>e.setItemRef(r,t.virtualId)},[m(e.$slots,"default",{item:t})],8,D)))),128))],4),m(e.$slots,"more")],36)],2112)},I.__file="packages/IceVirtualList/index.vue",I.install=e=>{e.component(I.name,I)};const S=I,H={class:"ice-header"};var T=l({name:"IceHeader",props:{title:{type:String,required:!1,default:"可视化数据展示平台"}},setup:e=>(t,r)=>(n(),i("div",H,[u("div",null,v(e.title),1)]))});T.__file="packages/IceHeader/index.vue";const x=(e,t)=>{const r=e;return r.install=a=>{a.component(r.name||r.displayName,e),t&&(a.config.globalProperties[t]=e)},e},E=x(T),k={class:"ice-header-2"};var M=l({name:"IceHeader2",props:{title:{type:String,required:!1,default:"可视化数据展示平台"}},setup:e=>(t,r)=>(n(),i("div",k,[u("div",null,v(e.title),1)]))});M.__file="packages/IceHeader2/index.vue";const N=x(M),_={class:"ice-menu"},j=["data-icon"],A={class:"title_tab"};var R=l({name:"IceMenu",props:{data:{type:Array,required:!0,default:()=>[{title:"菜单",icon:"icon-park-outline:application-menu"},{title:"菜单",icon:"icon-park-outline:application-menu"},{title:"菜单",icon:"icon-park-outline:application-menu"}]}},setup:e=>(t,r)=>(n(),i("div",_,[(n(!0),i(s,null,d(e.data,((e,t)=>(n(),i("div",{key:t},[u("span",{class:"iconify","data-icon":e.icon},null,8,j),u("div",A,v(e.title),1)])))),128))]))});R.__file="packages/IceMenu/index.vue";const L=x(R);var P={...w,...{Bind:(e,t,r,a=!1)=>(e.addEventListener(t,r,a),e),Unbind:(e,t,r,a=!1)=>(e.removeEventListener(t,r,a),e)},Validator:h};const Y=[S,E,N,L],B={...P,...Y};var F={install:e=>{Y.forEach((t=>e.component(t.name,t))),Object.keys(B).forEach((t=>{e.config.globalProperties[`$${t}`]=B[t]}))},...Y};export{P as IceAPI,E as IceHeader,N as IceHeader2,L as IceMenu,S as IceVirtualList,F as default};