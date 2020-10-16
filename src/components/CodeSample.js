import PropTypes from 'prop-types';
import React, {useMemo} from 'react';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import nightOwl from 'react-syntax-highlighter/dist/esm/styles/hljs/night-owl';
import {Box, IconButton, Tooltip, useClipboard} from '@chakra-ui/core';
import {DEFAULT_OPTIONS, VALID_OPTIONS} from '../utils';
import {Light as SyntaxHighlighter} from 'react-syntax-highlighter';
import {outdent} from 'outdent';

SyntaxHighlighter.registerLanguage('javascript', js);

export default function CodeSample({state}) {
  const code = useMemo(
    () => outdent`
      import getShareImage from '@jlengstorf/get-share-image';

      const shareImage = getShareImage({
        title: 'My Post Title',
        tagline: 'A tagline for the post',
        cloudName: 'mycloudname',
        imagePublicID: 'my-template-image',${Object.entries(state)
          .flatMap(entry => {
            switch (entry[0]) {
              case 'textY': {
                const offset = Math.round(state.imageHeight * entry[1]);
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

CodeSample.propTypes = {
  state: PropTypes.object.isRequired
};
