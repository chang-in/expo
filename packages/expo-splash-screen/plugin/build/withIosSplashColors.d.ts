import { ConfigPlugin } from 'expo/config-plugins';
import { IOSSplashConfig } from './getIosSplashConfig';
export type ContentsJsonColor = {
    appearances?: {
        appearance: 'luminosity';
        value: 'light' | 'dark' | 'tinted';
    }[];
    idiom: 'iphone' | 'ipad' | 'watchos' | 'ios' | 'ios-marketing' | 'universal';
    color: {
        'color-space': 'srgb';
        components: {
            alpha: string;
            blue: string;
            green: string;
            red: string;
        };
    };
};
export declare const SPLASHSCREEN_COLORSET_PATH = "Images.xcassets/SplashScreenBackground.colorset";
export declare const withIosSplashColors: ConfigPlugin<IOSSplashConfig>;
