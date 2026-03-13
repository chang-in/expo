"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAndroidSplashMainActivity = void 0;
const config_plugins_1 = require("expo/config-plugins");
const withAndroidSplashMainActivity = (config, { isLegacyConfig }) => {
    if (isLegacyConfig) {
        return config;
    }
    return (0, config_plugins_1.withMainActivity)(config, (config) => {
        const { modResults } = config;
        const { language } = modResults;
        const withImports = config_plugins_1.AndroidConfig.CodeMod.addImports(modResults.contents.replace(/(\/\/ )?setTheme\(R\.style\.AppTheme\)/, '// setTheme(R.style.AppTheme)'), ['expo.modules.splashscreen.SplashScreenManager'], language === 'java');
        const init = config_plugins_1.CodeGenerator.mergeContents({
            src: withImports,
            comment: '    //',
            tag: 'expo-splashscreen',
            offset: 0,
            anchor: /super\.onCreate\(null\)/,
            newSrc: '    SplashScreenManager.registerOnActivity(this)' + (language === 'java' ? ';' : ''),
        });
        return {
            ...config,
            modResults: {
                ...modResults,
                contents: init.contents,
            },
        };
    });
};
exports.withAndroidSplashMainActivity = withAndroidSplashMainActivity;
