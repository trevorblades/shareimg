import PropTypes from 'prop-types';
import React from 'react';
import {Heading, Stack} from '@chakra-ui/core';

export default function SettingsGroup({label, children}) {
  return (
    <Stack spacing="3">
      <Heading
        as="h6"
        fontSize="sm"
        textTransform="uppercase"
        letterSpacing="wider"
        lineHeight="tallest"
      >
        {label}
      </Heading>
      {children}
    </Stack>
  );
}

SettingsGroup.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};
