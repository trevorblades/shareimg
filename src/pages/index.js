import PropTypes from 'prop-types';
import React, {useState} from 'react';
import getShareImage from '@jlengstorf/get-share-image';
import {
  Box,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack
} from '@chakra-ui/core';
import {FiChevronDown, FiChevronUp} from 'react-icons/fi';
import {Helmet} from 'react-helmet';

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

function TextArea({textAreaWidth, textLeftOffset, ...props}) {
  return (
    <Box
      borderWidth="1px"
      borderStyle="dashed"
      position="absolute"
      w={textAreaWidth}
      left={textLeftOffset}
      {...props}
    />
  );
}

TextArea.propTypes = {
  textAreaWidth: PropTypes.number.isRequired,
  textLeftOffset: PropTypes.number.isRequired
};

export default function App() {
  const [title, setTitle] = useState('This is a title');
  const [tagline, setTagline] = useState('Lorem ipsum dolor set amit');
  const [textYPosition, setTextYPosition] = useState(
    titleConfig.y + defaultTextSpacing / 2
  );
  const [textSpacing, setTextSpacing] = useState(defaultTextSpacing);
  const [textLeftOffset, setTextLeftOffset] = useState(titleConfig.x);
  const [textAreaWidth, setTextAreaWidth] = useState(titleConfig.w);
  const [menuOpen, setMenuOpen] = useState(true);
  const [imageWidth, setImageWidth] = useState(imageConfig.w);
  const [imageHeight, setImageHeight] = useState(imageConfig.h);

  const textAreaProps = {textAreaWidth, textLeftOffset};

  return (
    <>
      <Helmet title="getShareImage playground" />
      <Center h="100vh" bg="black">
        <Box
          flexShrink="0"
          bg="white"
          w={imageWidth}
          h={imageHeight}
          userSelect="none"
          transform={['scale(0.25)', 'scale(0.3)', 'scale(0.5)', 'scale(0.7)']}
          position="relative"
        >
          <TextArea
            {...textAreaProps}
            bottom={textYPosition + textSpacing / 2}
            fontFamily={titleConfig.font}
            fontSize={titleConfig.size}
            color={'#' + titleConfig.color}
          >
            {title}
          </TextArea>
          <TextArea
            {...textAreaProps}
            top={imageHeight - textYPosition + textSpacing / 2}
            fontFamily={taglineConfig.font}
            fontSize={taglineConfig.size}
            color={'#' + taglineConfig.color}
          >
            {tagline}
          </TextArea>
        </Box>
        <Stack
          spacing="4"
          w="300px"
          position="absolute"
          top="4"
          left="4"
          bg="white"
          boxShadow="xl"
          p="4"
        >
          <Flex align="center">
            <Heading fontSize="md">Options</Heading>
            <IconButton
              ml="auto"
              size="sm"
              fontSize="lg"
              icon={menuOpen ? <FiChevronUp /> : <FiChevronDown />}
              onClick={() => setMenuOpen(prevMenuOpen => !prevMenuOpen)}
            />
          </Flex>
          {menuOpen && (
            <>
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
                <FormLabel>Text area width</FormLabel>
                <NumberInput
                  value={textAreaWidth}
                  onChange={(string, number) => setTextAreaWidth(number)}
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
                <FormLabel>Text Y position</FormLabel>
                <NumberInput
                  value={textYPosition}
                  onChange={(string, number) => setTextYPosition(number)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
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
            </>
          )}
        </Stack>
      </Center>
    </>
  );
}
