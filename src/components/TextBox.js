import PropTypes from 'prop-types';
import React from 'react';
import {Box} from '@chakra-ui/core';

export default function TextBox({state, name, ...props}) {
  const extraConfig = state[name + 'ExtraConfig'];
  return (
    <Box
      borderColor="gray.500"
      borderWidth="1px"
      borderStyle="dotted"
      position="absolute"
      fontFamily={state[name + 'Font']}
      fontSize={state[name + 'FontSize']}
      fontWeight={extraConfig}
      fontStyle={extraConfig}
      {...props}
    />
  );
}

TextBox.propTypes = {
  name: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired
};
