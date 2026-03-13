const defaultResizeMode = 'contain';
const defaultBackgroundColor = '#ffffff';

export interface IOSSplashConfig {
  imageWidth?: number;
  image?: string;
  backgroundColor: string;
  enableFullScreenImage_legacy?: boolean;
  resizeMode: 'cover' | 'contain';
  tabletImage?: string;
  tabletBackgroundColor?: string;
  dark?: {
    image?: string;
    backgroundColor?: string;
    tabletImage?: string;
    tabletBackgroundColor?: string;
  };
}

export function getIosSplashConfig(
  props: IOSSplashConfig | null
): IOSSplashConfig | null {
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
