import { getAndroidDarkSplashConfig, getAndroidSplashConfig } from '../getAndroidSplashConfig';

describe(getAndroidSplashConfig, () => {
  it(`should return config from props`, () => {
    const config = getAndroidSplashConfig({
      mdpi: 'b',
      resizeMode: 'contain',
    });
    expect(config?.mdpi).toBe('b');
    expect(config?.backgroundColor).toBe(undefined);
  });

  it(`should return null when no props`, () => {
    const config = getAndroidSplashConfig(null);
    expect(config).toBeNull();
  });
});

describe(getAndroidDarkSplashConfig, () => {
  it(`should return dark config from props`, () => {
    const config = getAndroidDarkSplashConfig({
      mdpi: 'b',
      resizeMode: 'contain',
      dark: { image: 'c', mdpi: 'c' },
    });
    expect(config?.mdpi).toBe('c');
    expect(config?.backgroundColor).toBe(undefined);
  });

  it(`should return null when no dark props`, () => {
    const config = getAndroidDarkSplashConfig({
      mdpi: 'b',
      resizeMode: 'contain',
    });
    expect(config).toBeNull();
  });
});
