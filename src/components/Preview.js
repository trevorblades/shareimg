import PropTypes from 'prop-types';
import React from 'react';
import TextBox from './TextBox';
import {Box} from '@chakra-ui/core';

export default function Preview({state, template}) {
  const textBoxStyle = {
    width: state.imageWidth - state.textLeftOffset - state.textRight,
    left: state.textLeftOffset
  };
  return (
    <Box
      bg="white"
      userSelect="none"
      transform={[
        'translate(-50%, -50%) scale(0.2)',
        'translate(-50%, -50%) scale(0.25)',
        'translate(-50%, -50%) scale(0.3)',
        'translate(-50%, -50%) scale(0.5)',
        'translate(-50%, -50%) scale(0.7)'
      ]}
      position="absolute"
      top="50%"
      left="50%"
      style={{
        width: state.imageWidth,
        height: state.imageHeight,
        color: '#' + state.textColor,
        backgroundImage: template && `url(${template})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <TextBox
        name="title"
        state={state}
        transform="translateY(-100%)"
        style={{
          ...textBoxStyle,
          top: state.imageHeight * state.textY - state.textSpacing / 2
        }}
      >
        {state.title}
      </TextBox>
      <TextBox
        name="tagline"
        state={state}
        style={{
          ...textBoxStyle,
          color: state.taglineColor && '#' + state.taglineColor,
          top: state.imageHeight * state.textY + state.textSpacing / 2
        }}
      >
        {state.tagline}
      </TextBox>
    </Box>
  );
}

Preview.propTypes = {
  state: PropTypes.object.isRequired,
  template: PropTypes.string
};
