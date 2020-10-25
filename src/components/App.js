import 'prism-theme-night-owl';
import CodeSample, {AppContext} from './CodeSample';
import Preview from './Preview';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import Sidebar from './Sidebar';
import useDrop from 'react-use/lib/useDrop';
import {
  Box,
  Button,
  ButtonGroup,
  Code,
  DarkMode,
  Grid,
  HStack,
  Heading,
  IconButton,
  ListItem,
  OrderedList,
  Stack,
  Text,
  Tooltip,
  UnorderedList
} from '@chakra-ui/core';
import {DEFAULT_OPTIONS} from '../utils';
import {FaGithub} from 'react-icons/fa';
import {Helmet} from 'react-helmet';
import {MDXProvider} from '@mdx-js/react';

const components = {
  h1(props) {
    return <Heading fontSize="6xl" {...props} />;
  },
  h2(props) {
    return <Heading fontSize="5xl" {...props} />;
  },
  h3(props) {
    return <Heading fontSize="4xl" {...props} />;
  },
  h4(props) {
    return <Heading fontSize="3xl" {...props} />;
  },
  h5(props) {
    return <Heading fontSize="2xl" {...props} />;
  },
  h6(props) {
    return <Heading fontSize="xl" {...props} />;
  },
  p: Text,
  inlineCode: Code,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  CodeSample
};

export default function App({children}) {
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
          md: '1fr 250px',
          lg: '1fr 300px'
        }}
      >
        <Box position="relative" overflow="hidden">
          <HStack spacing="3" position="absolute" bottom="3" left="3">
            <ButtonGroup size="sm" isAttached>
              <Button
                leftIcon={<span>🌮</span>}
                colorScheme={preview ? 'purple' : 'gray'}
                onClick={() => setPreview(true)}
              >
                Preview
              </Button>
              <Button
                leftIcon={<span>💻</span>}
                colorScheme={!preview ? 'purple' : 'gray'}
                onClick={() => setPreview(false)}
              >
                Code
              </Button>
            </ButtonGroup>
            <Tooltip label="View on GitHub" placement="right">
              <IconButton
                as="a"
                href="https://github.com/trevorblades/shareimg"
                target="_blank"
                icon={<FaGithub />}
                fontSize="3xl"
                size="sm"
                borderRadius="full"
                variant="ghost"
              />
            </Tooltip>
          </HStack>
          {preview ? (
            <Preview state={state} template={template} />
          ) : (
            <Box bg="gray.800" h="full" overflow="auto">
              <Box px="8" pt="10" pb="20" maxW="container.md">
                <AppContext.Provider value={state}>
                  <MDXProvider components={components}>
                    <Stack spacing="5" shouldWrapChildren>
                      {children}
                    </Stack>
                  </MDXProvider>
                </AppContext.Provider>
              </Box>
            </Box>
          )}
        </Box>
        <Sidebar state={state} setState={setState} />
      </Grid>
    </DarkMode>
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired
};
