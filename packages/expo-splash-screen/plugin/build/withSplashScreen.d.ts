import { AndroidSplashConfig } from './getAndroidSplashConfig';
import { IOSSplashConfig } from './getIosSplashConfig';
import { ConfigPlugin } from 'expo/config-plugins';
type PluginConfig = {
    backgroundColor: string;
    imageWidth?: number;
    enableFullScreenImage_legacy?: boolean;
    image?: string;
    resizeMode?: 'contain' | 'cover' | 'native';
    dark?: {
        image?: string;
        backgroundColor?: string;
    };
    android?: AndroidSplashConfig;
    ios?: IOSSplashConfig;
};
declare const _default: ConfigPlugin<PluginConfig | null>;
export default _default;
