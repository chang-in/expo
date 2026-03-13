import { AndroidConfig, CodeGenerator, ConfigPlugin, withMainActivity } from 'expo/config-plugins';

export const withAndroidSplashMainActivity: ConfigPlugin<{ isLegacyConfig: boolean }> = (
  config,
  { isLegacyConfig }
) => {
  if (isLegacyConfig) {
    return config;
  }
  return withMainActivity(config, (config) => {
    const { modResults } = config;
    const { language } = modResults;

    const withImports = AndroidConfig.CodeMod.addImports(
      modResults.contents.replace(
        /(\/\/ )?setTheme\(R\.style\.AppTheme\)/,
        '// setTheme(R.style.AppTheme)'
      ),
      ['expo.modules.splashscreen.SplashScreenManager'],
      language === 'java'
    );

    const init = CodeGenerator.mergeContents({
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
