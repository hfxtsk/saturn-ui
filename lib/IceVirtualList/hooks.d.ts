import { ComponentPublicInstance } from 'vue';
import { Props } from './types';
import { Emits } from './interfaces';
export declare const useHandler: (props: Props, emit: Emits) => {
    scrollBarHeight: any;
    scrollTranslateY: any;
    renderData: any;
    onScroll: (e: Event) => void;
    setItemRef: (el: Element | ComponentPublicInstance | null, index: number) => void;
};
