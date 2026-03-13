"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAndroidSplashScreen = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const getAndroidSplashConfig_1 = require("./getAndroidSplashConfig");
const withAndroidSplashDrawables_1 = require("./withAndroidSplashDrawables");
const withAndroidSplashImages_1 = require("./withAndroidSplashImages");
const withAndroidSplashMainActivity_1 = require("./withAndroidSplashMainActivity");
const withAndroidSplashStrings_1 = require("./withAndroidSplashStrings");
const withAndroidSplashStyles_1 = require("./withAndroidSplashStyles");
const withAndroidSplashScreen = (config, props) => {
    const isLegacyConfig = props === undefined;
    const splashConfig = (0, getAndroidSplashConfig_1.getAndroidSplashConfig)(props ?? null);
    return (0, config_plugins_1.withPlugins)(config, [
        [withAndroidSplashMainActivity_1.withAndroidSplashMainActivity, { isLegacyConfig }],
        [withAndroidSplashImages_1.withAndroidSplashImages, splashConfig],
        [withAndroidSplashDrawables_1.withAndroidSplashDrawables, splashConfig],
        [withAndroidSplashStyles_1.withAndroidSplashStyles, { splashConfig, isLegacyConfig }],
        [withAndroidSplashStrings_1.withAndroidSplashStrings, splashConfig],
    ]);
};
exports.withAndroidSplashScreen = withAndroidSplashScreen;
