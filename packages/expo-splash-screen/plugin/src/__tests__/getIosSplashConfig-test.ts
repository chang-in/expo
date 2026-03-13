import assert from 'assert';

import { getIosSplashConfig } from '../getIosSplashConfig';

describe(getIosSplashConfig, () => {
  it(`should return config from props`, () => {
    const config = getIosSplashConfig({
      image: 'b',
      backgroundColor: '#ff0000',
      resizeMode: 'cover',
    });
    assert(config);
    expect(config.image).toBe('b');
    expect(config.backgroundColor).toBe('#ff0000');
    expect(config.resizeMode).toBe('cover');
  });

  it(`should return defaults when props is null`, () => {
    const config = getIosSplashConfig(null);
    assert(config);
    expect(config.backgroundColor).toBe('#ffffff');
    expect(config.resizeMode).toBe('contain');
  });

  it(`should use default backgroundColor when not specified`, () => {
    const config = getIosSplashConfig({
      image: 'a',
      backgroundColor: undefined as any,
      resizeMode: 'contain',
    });
    assert(config);
    expect(config.backgroundColor).toBe('#ffffff');
  });
});
