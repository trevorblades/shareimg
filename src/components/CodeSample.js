import React, {createContext, useContext, useMemo} from 'react';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import nightOwl from 'react-syntax-highlighter/dist/esm/styles/hljs/night-owl';
import {Box, IconButton, Tooltip, useClipboard} from '@chakra-ui/core';
import {DEFAULT_OPTIONS, VALID_OPTIONS} from '../utils';
import {Light as SyntaxHighlighter} from 'react-syntax-highlighter';
import {outdent} from 'outdent';

export const AppContext = createContext();

SyntaxHighlighter.registerLanguage('javascript', js);

export default function CodeSample() {
  const state = useContext(AppContext);
  const code = useMemo(
    () => outdent`
      import getShareImage from '@jlengstorf/get-share-image';

      const shareImage = getShareImage({
        title: 'My Post Title',
        tagline: 'A tagline for the post',
        cloudName: 'mycloudname',
        imagePublicID: 'my-template-image',${Object.entries(state)
          .flatMap(entry => {
            const [key, value] = entry;
            switch (key) {
              case 'textY': {
                const offset = Math.round(state.imageHeight * value);
                return [
                  [
                    'titleBottomOffset',
                    state.imageHeight -
                      offset +
                      Math.ceil(state.textSpacing / 2)
                  ],
                  [
                    'taglineTopOffset',
                    offset + Math.floor(state.textSpacing / 2)
                  ]
                ];
              }
              case 'textRight':
                return [
                  [
                    'textAreaWidth',
                    state.imageWidth - state.textLeftOffset - value
                  ]
                ];
              case 'titleExtraConfig':
              case 'taglineExtraConfig':
                return value ? [[key, '_' + value]] : [];
              default:
                return [entry];
            }
          })
          .filter(
            ([key, value]) =>
              DEFAULT_OPTIONS[key] !== value &&
              Object.keys(VALID_OPTIONS).includes(key)
          )
          .map(
            ([key, value]) =>
              `\n  ${key}: ` + JSON.stringify(value).replace(/"/g, "'")
          )}
      });
    `,
    [state]
  );

  const {hasCopied, onCopy} = useClipboard(code);
  return (
    <Box position="relative">
      <SyntaxHighlighter language="javascript" style={nightOwl}>
        {code}
      </SyntaxHighlighter>
      <Tooltip placement="left" label="Copy to clipboard">
        <IconButton
          textAlign="center"
          icon={<span>{hasCopied ? '👍' : '📋'}</span>}
          position="absolute"
          bottom="4"
          right="4"
          borderRadius="full"
          onClick={onCopy}
        />
      </Tooltip>
    </Box>
  );
}
