import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import WebFont from 'webfontloader';
import {DEFAULT_OPTIONS} from '../utils';
import {
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select
} from '@chakra-ui/core';
import {graphql, useStaticQuery} from 'gatsby';

export default function TextSettings({state, setState, ...props}) {
  const data = useStaticQuery(
    graphql`
      query ListWebfonts {
        allWebfont {
          nodes {
            id
            family
          }
        }
      }
    `
  );

  const fontKey = props.name + 'Font';
  const font = state[fontKey];
  useEffect(() => {
    if (font !== DEFAULT_OPTIONS[fontKey]) {
      WebFont.load({
        google: {
          families: [font]
        }
      });
    }
  }, [font, fontKey]);

  return (
    <>
      <Input value={state[props.name]} {...props} />
      <HStack>
        <Select
          size="sm"
          value={font}
          onChange={event => {
            const {value} = event.target;
            setState(prevState => ({
              ...prevState,
              [fontKey]: value
            }));
          }}
        >
          <option value="arial">Arial</option>
          {data.allWebfont.nodes.slice(0, 20).map(webfont => (
            <option key={webfont.id}>{webfont.family}</option>
          ))}
        </Select>
        <NumberInput
          size="sm"
          value={state[props.name + 'FontSize']}
          onChange={(string, number) =>
            setState(prevState => ({
              ...prevState,
              [props.name + 'FontSize']: number
            }))
          }
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Select
          size="sm"
          value={state[props.name + 'ExtraConfig']}
          onChange={event => {
            const {value} = event.target;
            setState(prevState => ({
              ...prevState,
              [props.name + 'ExtraConfig']: value
            }));
          }}
        >
          {/* TODO: add underscore to extraConfig option in code */}
          <option value="">Normal</option>
          <option value="bold">Bold</option>
          <option value="italic">Italic</option>
        </Select>
      </HStack>
    </>
  );
}

TextSettings.propTypes = {
  name: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired
};
