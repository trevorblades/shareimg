import React, {useState} from 'react';
import getShareImage from '@jlengstorf/get-share-image';
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack
} from '@chakra-ui/core';
import {Helmet} from 'react-helmet';
import {graphql, useStaticQuery} from 'gatsby';

const [imageConfig, titleConfig, taglineConfig] = getShareImage({
  title: 'foo',
  tagline: 'bar'
})
  .split('/')
  .slice(-3)
  .map(segment =>
    segment.split(',').reduce((acc, part) => {
      const [key, ...values] = part.split('_');
      const value = values.join('_');

      switch (key) {
        case 'co': {
          const [, color] = value.split(':');
          return {
            ...acc,
            color
          };
        }
        case 'l': {
          const [, match] = value.match(/:([\w_]+):/);
          const [font, size] = match.split('_');
          return {
            ...acc,
            font,
            size: Number(size)
          };
        }
        default: {
          const number = Number(value);
          return {
            ...acc,
            [key]: Number.isNaN(number) ? value : number
          };
        }
      }
    }, {})
  );

const defaultTextSpacing = titleConfig.y - (imageConfig.h - taglineConfig.y);

function TextArea(props) {
  return (
    <Box
      borderColor="gray.500"
      borderWidth="1px"
      borderStyle="dotted"
      position="absolute"
      {...props}
    />
  );
}

export default function App() {
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

  const [title, setTitle] = useState('This is a title');
  const [tagline, setTagline] = useState('Lorem ipsum dolor set amit');
  const [textPosition, setTextPosition] = useState(
    (taglineConfig.y - defaultTextSpacing / 2) / imageConfig.h
  );
  const [textSpacing, setTextSpacing] = useState(defaultTextSpacing);
  const [textLeftOffset, setTextLeftOffset] = useState(titleConfig.x);
  const [textRightOffset, setTextRightOffset] = useState(
    imageConfig.w - titleConfig.w - titleConfig.x
  );
  const [imageWidth, setImageWidth] = useState(imageConfig.w);
  const [imageHeight, setImageHeight] = useState(imageConfig.h);

  const textAreaProps = {
    w: imageWidth - textLeftOffset - textRightOffset,
    left: textLeftOffset
  };

  return (
    <>
      <Helmet title="getShareImage playground" />
      <Grid h="100vh" templateColumns="1fr 3fr">
        <Stack p="6" spacing="4" overflow="auto">
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Tagline</FormLabel>
            <Input
              value={tagline}
              onChange={event => setTagline(event.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Font Family</FormLabel>
            <Select>
              {data.allWebfont.nodes.slice(0, 20).map(webfont => (
                <option key={webfont.id}>{webfont.family}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Image width</FormLabel>
            <NumberInput
              value={imageWidth}
              onChange={(string, number) => setImageWidth(number)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Image height</FormLabel>
            <NumberInput
              value={imageHeight}
              onChange={(string, number) => setImageHeight(number)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Text left offset</FormLabel>
            <NumberInput
              value={textLeftOffset}
              onChange={(string, number) => setTextLeftOffset(number)}
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
              value={textRightOffset}
              onChange={(string, number) => setTextRightOffset(number)}
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
              Text Y position: {Math.round(textPosition * 100)} %
            </FormLabel>
            <Slider
              min={0}
              max={1}
              step={0.01}
              value={textPosition}
              onChange={setTextPosition}
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
              value={textSpacing}
              onChange={(string, number) => setTextSpacing(number)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </Stack>
        <Box bg="black" position="relative" overflow="hidden">
          <Box
            flexShrink="0"
            bg="white"
            w={imageWidth}
            h={imageHeight}
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
          >
            <TextArea
              {...textAreaProps}
              top={imageHeight * textPosition - textSpacing / 2}
              fontFamily={titleConfig.font}
              fontSize={titleConfig.size}
              color={'#' + titleConfig.color}
              transform="translateY(-100%)"
            >
              {title}
            </TextArea>
            <TextArea
              {...textAreaProps}
              top={imageHeight * textPosition + textSpacing / 2}
              fontFamily={taglineConfig.font}
              fontSize={taglineConfig.size}
              color={'#' + taglineConfig.color}
            >
              {tagline}
            </TextArea>
          </Box>
        </Box>
      </Grid>
    </>
  );
}
