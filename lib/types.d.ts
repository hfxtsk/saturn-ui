import type { App } from 'vue';
export declare type SFCWithInstall<T> = T & {
    install(app: App): void;
};
export declare type PublicProps<T, U = {}> = Readonly<T> & U;
export declare const withInstall: <T>(component: T, alias?: string | undefined) => any;
