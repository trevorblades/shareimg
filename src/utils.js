import getShareImage from '@jlengstorf/get-share-image';

const [imageConfig, titleConfig, taglineConfig] = getShareImage({
  title: 'foo',
  tagline: 'bar'
})
  .split('/')
  .slice(-3)
  .map(segment =>
    segment.split(',').reduce((acc, part) => {
      const [key, ...values] = part.split('_');
      const value = values.join('_');

      switch (key) {
        case 'co': {
          const [, color] = value.split(':');
          return {
            ...acc,
            color
          };
        }
        case 'l': {
          const [, match] = value.match(/:([\w_]+):/);
          const [font, size, extraConfig] = match.split('_');
          return {
            ...acc,
            font,
            size: Number(size),
            extraConfig
          };
        }
        default: {
          const number = Number(value);
          return {
            ...acc,
            [key]: Number.isNaN(number) ? value : number
          };
        }
      }
    }, {})
  );

const DEFAULT_TEXT_SPACING = titleConfig.y - (imageConfig.h - taglineConfig.y);

export const TITLE_OPTIONS = {
  titleFont: titleConfig.font,
  titleFontSize: titleConfig.size,
  titleExtraConfig: titleConfig.extraConfig
};

export const TAGLINE_OPTIONS = {
  taglineFont: taglineConfig.font,
  taglineFontSize: taglineConfig.size,
  taglineExtraConfig: taglineConfig.extraConfig
};

export const IMAGE_OPTIONS = {
  imageWidth: imageConfig.w,
  imageHeight: imageConfig.h
};

export const VALID_OPTIONS = {
  ...TITLE_OPTIONS,
  ...TAGLINE_OPTIONS,
  ...IMAGE_OPTIONS,
  titleBottomOffset: titleConfig.y,
  taglineTopOffset: taglineConfig.y,
  textLeftOffset: titleConfig.x,
  textAreaWidth: titleConfig.w,
  textColor: titleConfig.color
};

const {textLeftOffset} = VALID_OPTIONS;
export const LAYOUT_OPTIONS = {
  textLeftOffset,
  textY: (taglineConfig.y - DEFAULT_TEXT_SPACING / 2) / imageConfig.h,
  textRight: imageConfig.w - titleConfig.w - titleConfig.x,
  textSpacing: DEFAULT_TEXT_SPACING
};

export const DEFAULT_OPTIONS = {
  ...VALID_OPTIONS,
  ...LAYOUT_OPTIONS
};
