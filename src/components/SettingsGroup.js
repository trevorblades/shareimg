import PropTypes from 'prop-types';
import React from 'react';
import {Flex, Heading, IconButton, Stack} from '@chakra-ui/core';
import {MdRefresh} from 'react-icons/md';

export default function SettingsGroup({label, onReset, children}) {
  return (
    <Stack spacing="3">
      <Flex align="center">
        <Heading
          as="h6"
          fontSize="sm"
          textTransform="uppercase"
          letterSpacing="wider"
          lineHeight="tallest"
        >
          {label}
        </Heading>
        <IconButton
          ml="auto"
          borderRadius="full"
          icon={<MdRefresh />}
          size="xs"
          fontSize="lg"
          onClick={onReset}
        />
      </Flex>
      {children}
    </Stack>
  );
}

SettingsGroup.propTypes = {
  label: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};
