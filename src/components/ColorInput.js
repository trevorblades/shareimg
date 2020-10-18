import PropTypes from 'prop-types';
import React from 'react';
import {HStack} from '@chakra-ui/core';

export default function ColorInput({state, setState, name}) {
  return (
    <HStack as="label">
      <span>Color</span>
      <input
        type="color"
        value={'#' + state[name]}
        onChange={event => {
          // TODO: debounce this
          const color = event.currentTarget.value.slice(1);
          setState(prevState => ({
            ...prevState,
            [name]: color
          }));
        }}
      />
    </HStack>
  );
}

ColorInput.propTypes = {
  state: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};
