import PropTypes from 'prop-types';
import React from 'react';
import {Heading, Stack} from '@chakra-ui/core';

export default function SettingsGroup({label, children}) {
  return (
    <Stack>
      <Heading as="h5" fontSize="md" textTransform="uppercase">
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
