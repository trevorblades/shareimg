import CodeSample from '../components/CodeSample';
import ColorInput from '../components/ColorInput';
import Preview from '../components/Preview';
import React, {useState} from 'react';
import SettingsGroup from '../components/SettingsGroup';
import TextSettings from '../components/TextSettings';
import useDrop from 'react-use/lib/useDrop';
import {
  Button,
  ButtonGroup,
  Center,
  Checkbox,
  DarkMode,
  Grid,
  HStack,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Tooltip,
  useTheme
} from '@chakra-ui/core';
import {
  DEFAULT_OPTIONS,
  IMAGE_OPTIONS,
  LAYOUT_OPTIONS,
  TAGLINE_OPTIONS,
  TITLE_OPTIONS
} from '../utils';
import {FaGithub} from 'react-icons/fa';
import {Helmet} from 'react-helmet';

export default function App() {
  const {colors} = useTheme();
  const [preview, setPreview] = useState(true);
  const [state, setState] = useState({
    ...DEFAULT_OPTIONS,
    title: 'This is a title',
    tagline: 'Lorem ipsum dolor set amit',
    useTitleColor: true
  });

  const [template, setTemplate] = useState(null);
  useDrop({
    onFiles: files => {
      const image = files.find(({type}) => type.startsWith('image/'));
      if (image) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setTemplate(reader.result);
        };
        reader.readAsDataURL(image);
      }
    }
  });

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
          href="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/taco_1f32e.png"
        />
      </Helmet>
      <Grid
        h="100vh"
        bg="black"
        color="gray.50"
        templateColumns={{
          md: '2fr 1fr',
          lg: '3fr 1fr'
        }}
      >
        <Center position="relative" overflow="hidden">
          <Tooltip label="View on GitHub" placement="right">
            <IconButton
              as="a"
              href="https://github.com/trevorblades/shareimg"
              target="_blank"
              icon={<FaGithub />}
              position="absolute"
              bottom="3"
              left="3"
              fontSize="3xl"
              borderRadius="full"
              variant="ghost"
            />
          </Tooltip>
          {preview ? (
            <Preview state={state} template={template} />
          ) : (
            <CodeSample state={state} />
          )}
          <ButtonGroup
            isAttached
            position="absolute"
            top="0"
            left="50%"
            transform="translateX(-50%)"
            bg="gray.900"
            borderBottomRadius="lg"
          >
            <Button
              leftIcon={<span>🌮</span>}
              borderRadius="lg"
              borderTopRadius="0"
              colorScheme={preview ? 'purple' : 'gray'}
              onClick={() => setPreview(true)}
            >
              Preview
            </Button>
            <Button
              leftIcon={<span>💻</span>}
              borderRadius="lg"
              borderTopRadius="0"
              colorScheme={!preview ? 'purple' : 'gray'}
              onClick={() => setPreview(false)}
            >
              Code
            </Button>
          </ButtonGroup>
        </Center>
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
                <ColorInput
                  state={state}
                  setState={setState}
                  name="taglineColor"
                />
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
                  onChange={textY =>
                    setState(prevState => ({...prevState, textY}))
                  }
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
      </Grid>
    </DarkMode>
  );
}
