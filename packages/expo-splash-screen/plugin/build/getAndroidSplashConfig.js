"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAndroidSplashConfig = getAndroidSplashConfig;
exports.getAndroidDarkSplashConfig = getAndroidDarkSplashConfig;
const defaultResizeMode = 'contain';
function getAndroidSplashConfig(props) {
    if (!props) {
        return null;
    }
    return {
        xxxhdpi: props.xxxhdpi ?? props.image,
        xxhdpi: props.xxhdpi ?? props.image,
        xhdpi: props.xhdpi ?? props.image,
        hdpi: props.hdpi ?? props.image,
        mdpi: props.mdpi ?? props.image,
        backgroundColor: props.backgroundColor,
        resizeMode: props.resizeMode ?? defaultResizeMode,
        image: props.image,
        imageWidth: props.imageWidth ?? 100,
        dark: props.dark,
        drawable: props.drawable,
    };
}
function getAndroidDarkSplashConfig(props) {
    if (!props?.dark) {
        return null;
    }
    const splash = props.dark;
    const lightTheme = getAndroidSplashConfig(props);
    return {
        xxxhdpi: splash.xxxhdpi ?? splash.image,
        xxhdpi: splash.xxhdpi ?? splash.image,
        xhdpi: splash.xhdpi ?? splash.image,
        hdpi: splash.hdpi ?? splash.image,
        mdpi: splash.mdpi ?? splash.image,
        image: splash.image,
        backgroundColor: splash.backgroundColor,
        resizeMode: lightTheme?.resizeMode ?? defaultResizeMode,
        drawable: props.drawable,
    };
}
