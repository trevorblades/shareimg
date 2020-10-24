import ColorInput from './ColorInput';
import PropTypes from 'prop-types';
import React from 'react';
import SettingsGroup from './SettingsGroup';
import TextSettings from './TextSettings';
import {
  Checkbox,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack
} from '@chakra-ui/core';
import {
  IMAGE_OPTIONS,
  LAYOUT_OPTIONS,
  TAGLINE_OPTIONS,
  TITLE_OPTIONS
} from '../utils';

export default function Sidebar({state, setState}) {
  function handleInputChange(event) {
    const {name, value} = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
  return (
    <Stack
      display={{base: 'none', md: 'flex'}}
      as="aside"
      p="4"
      spacing="8"
      overflow="auto"
      bg="gray.900"
    >
      <SettingsGroup
        label="Title"
        onReset={() =>
          setState(prevState => ({...prevState, ...TITLE_OPTIONS}))
        }
      >
        <TextSettings
          placeholder="Title text"
          name="title"
          onChange={handleInputChange}
          state={state}
          setState={setState}
        />
        <HStack>
          <ColorInput state={state} setState={setState} name="textColor" />
        </HStack>
      </SettingsGroup>
      <SettingsGroup
        label="Tagline"
        onReset={() =>
          setState(prevState => ({...prevState, ...TAGLINE_OPTIONS}))
        }
      >
        <TextSettings
          placeholder="#tags or a short description"
          name="tagline"
          onChange={handleInputChange}
          state={state}
          setState={setState}
        />
        <HStack spacing="4">
          <Checkbox
            isChecked={state.useTitleColor}
            onChange={event => {
              const useTitleColor = event.target.checked;
              setState(prevState => ({
                ...prevState,
                useTitleColor,
                taglineColor: useTitleColor ? undefined : state.textColor
              }));
            }}
          >
            Use title color
          </Checkbox>
          {!state.useTitleColor && (
            <ColorInput state={state} setState={setState} name="taglineColor" />
          )}
        </HStack>
      </SettingsGroup>
      <SettingsGroup
        label="Image dimensions"
        onReset={() =>
          setState(prevState => ({...prevState, ...IMAGE_OPTIONS}))
        }
      >
        <HStack spacing="4">
          <HStack as="label">
            <span>Width</span>
            <NumberInput
              size="sm"
              value={state.imageWidth}
              onChange={(string, imageWidth) =>
                setState(prevState => ({...prevState, imageWidth}))
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </HStack>
          <HStack as="label">
            <span>Height</span>
            <NumberInput
              size="sm"
              value={state.imageHeight}
              onChange={(string, imageHeight) =>
                setState(prevState => ({...prevState, imageHeight}))
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </HStack>
        </HStack>
      </SettingsGroup>
      <SettingsGroup
        label="Text layout"
        onReset={() =>
          setState(prevState => ({
            ...prevState,
            ...LAYOUT_OPTIONS
          }))
        }
      >
        <HStack spacing="4">
          <HStack as="label">
            <span>Left</span>
            <NumberInput
              size="sm"
              value={state.textLeftOffset}
              onChange={(string, textLeftOffset) =>
                setState(prevState => ({...prevState, textLeftOffset}))
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </HStack>
          <HStack as="label">
            <span>Right</span>
            <NumberInput
              size="sm"
              value={state.textRight}
              onChange={(string, textRight) =>
                setState(prevState => ({...prevState, textRight}))
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </HStack>
        </HStack>
        <HStack spacing="4">
          <HStack flexGrow="1" w="full">
            <span>Y</span>
            <Slider
              colorScheme="purple"
              focusThumbOnChange={false}
              min={0}
              max={1}
              step={0.01}
              value={state.textY}
              onChange={textY => setState(prevState => ({...prevState, textY}))}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </HStack>
          <NumberInput
            size="sm"
            value={Math.round(state.textY * 100)}
            onChange={(string, number) =>
              setState(prevState => ({
                ...prevState,
                textY: number / 100
              }))
            }
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </HStack>
        <HStack as="label">
          <span>Spacing</span>
          <NumberInput
            size="sm"
            value={state.textSpacing}
            onChange={(string, textSpacing) =>
              setState(prevState => ({...prevState, textSpacing}))
            }
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </HStack>
      </SettingsGroup>
    </Stack>
  );
}

Sidebar.propTypes = {
  state: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired
};
