"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIosSplashConfig = getIosSplashConfig;
const defaultResizeMode = 'contain';
const defaultBackgroundColor = '#ffffff';
function getIosSplashConfig(props) {
    if (props) {
        return {
            image: props.image,
            resizeMode: props.resizeMode ?? defaultResizeMode,
            backgroundColor: props.backgroundColor ?? defaultBackgroundColor,
            tabletImage: props.tabletImage,
            tabletBackgroundColor: props.tabletBackgroundColor,
            enableFullScreenImage_legacy: props.enableFullScreenImage_legacy,
            dark: {
                image: props.dark?.image,
                backgroundColor: props.dark?.backgroundColor,
                tabletImage: props.dark?.tabletImage,
                tabletBackgroundColor: props.dark?.tabletBackgroundColor,
            },
            imageWidth: props.imageWidth,
        };
    }
    return {
        backgroundColor: '#ffffff',
        resizeMode: 'contain',
        enableFullScreenImage_legacy: true,
        imageWidth: 200,
    };
}
