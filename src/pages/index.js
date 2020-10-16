import React, {useState} from 'react';
import SettingsGroup from '../components/SettingsGroup';
import TextBox from '../components/TextBox';
import TextSettings from '../components/TextSettings';
import {
  Box,
  DarkMode,
  FormControl,
  FormLabel,
  Grid,
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
import {DEFAULT_OPTIONS} from '../utils';
import {Helmet} from 'react-helmet';

export default function App() {
  const [state, setState] = useState({
    ...DEFAULT_OPTIONS,
    title: 'This is a title',
    tagline: 'Lorem ipsum dolor set amit'
  });

  const textBoxProps = {
    w: state.imageWidth - state.textLeft - state.textRight,
    left: state.textLeft
  };

  function handleInputChange(event) {
    const {name, value} = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <DarkMode>
      <Helmet title="shareimg">
        <link
          rel="icon"
          href="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/sandwich_1f96a.png"
        />
      </Helmet>
      <Grid
        h="100vh"
        bg="black"
        color="gray.100"
        templateColumns={{
          md: '2fr 1fr',
          lg: '3fr 1fr'
        }}
      >
        <Box position="relative" overflow="hidden">
          <Box
            flexShrink="0"
            bg="white"
            w={state.imageWidth}
            h={state.imageHeight}
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
            color={'#' + state.textColor}
          >
            <TextBox
              {...textBoxProps}
              name="title"
              state={state}
              top={state.imageHeight * state.textY - state.textSpacing / 2}
              transform="translateY(-100%)"
            >
              {state.title}
            </TextBox>
            <TextBox
              {...textBoxProps}
              name="tagline"
              state={state}
              top={state.imageHeight * state.textY + state.textSpacing / 2}
            >
              {state.tagline}
            </TextBox>
          </Box>
        </Box>
        <Stack as="aside" p="4" spacing="8" overflow="auto" bg="gray.900">
          <SettingsGroup label="Title">
            <TextSettings
              placeholder="Title text"
              name="title"
              onChange={handleInputChange}
              state={state}
              setState={setState}
            />
          </SettingsGroup>
          <SettingsGroup label="Tagline">
            <TextSettings
              placeholder="#tags or a short description"
              name="tagline"
              onChange={handleInputChange}
              state={state}
              setState={setState}
            />
          </SettingsGroup>
          <SettingsGroup label="Image dimensions">
            <HStack spacing="4">
              <HStack as="label">
                <span>Width:</span>
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
                <span>Height:</span>
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
          <FormControl>
            <FormLabel>Text left offset</FormLabel>
            <NumberInput
              value={state.textLeft}
              onChange={(string, textLeft) =>
                setState(prevState => ({...prevState, textLeft}))
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Text right offset</FormLabel>
            <NumberInput
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
          </FormControl>
          <FormControl>
            <FormLabel>
              Text Y position: {Math.round(state.textY * 100)} %
            </FormLabel>
            <Slider
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
          </FormControl>
          <FormControl>
            <FormLabel>Text spacing</FormLabel>
            <NumberInput
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
          </FormControl>
        </Stack>
      </Grid>
    </DarkMode>
  );
}
