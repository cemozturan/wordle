import { Button, VStack, Box, useColorMode } from '@chakra-ui/react'
import { COLOR_VALUES } from '../constants'
import { Container } from './Container'

const bgColor = { light: '#d3d6da', dark: '#818384' }
const backspaceColor = { light: '#1a1a1b', dark: '#d7dadc' }

const isLetter = char => RegExp(/^[A-Z]$/,'u').test(char)

const getBgColor = (letter, usedLetters, colorMode) => {
  const usedLetter = usedLetters.find(x => x.value === letter)
  if (usedLetter) {
    return COLOR_VALUES[colorMode][usedLetter.status]
  }
  return bgColor[colorMode]
}

const getLetterColor = (letter, usedLetters, colorMode) => {
  const usedLetter = usedLetters.find(x => x.value === letter)
  if (usedLetter) {
    return COLOR_VALUES[colorMode].evaluatedText
  }
  return COLOR_VALUES[colorMode].nonEvaluatedText
}

const getLetterWidth = char => {
  return isLetter(char) ? {
    base: '31px',
    md: '43px',
  } : {
    base: '45px',
    md: '65px',
  }
}

const getRowPadding = defaultPadding => {
  return defaultPadding ? {
    base: 4,
    md: 6 
  } : {
    base: '0'
  }
}

const createKeyboard = (colorMode, processInputLetter, usedLetters) => {
  const rows = [
    { chars: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'], paddingLeft: 0 },
    { chars: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'], paddingLeft: 6 },
    { chars: ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', (<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
    <path fill={backspaceColor[colorMode]} d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
  </svg>)], paddingLeft: 0 },
  ];
  return (
    <VStack
      spacing={1}
      align='stretch'
    >
      {rows.map((row, rowIndex) =>
        <Box key={rowIndex} pl={getRowPadding(row.paddingLeft)}>
          {row.chars.map((char, index) =>
            <Button
              key={index} h='58px' w={getLetterWidth(char)}
              bg={getBgColor(char, usedLetters, colorMode)} m={0.5}
              minWidth='31px'
              color={getLetterColor(char, usedLetters, colorMode)}
              fontSize={isLetter(char) ? '14px' : '12px'}
              fontWeight='bold'
              paddingInlineStart={0}
              paddingInlineEnd={0}
              onClick={() => processInputLetter({ value: char })}>
              {char}
            </Button>
          )}
        </Box>)}
    </VStack>
  )
};

export const Keyboard = ({ processInputLetter, usedLetters }) => {
  const { colorMode } = useColorMode()
  return (
    <Container
      flexDirection="row"
      position="fixed"
      bottom="0"
      width="100%"
      maxWidth="48rem"
      py={2}
      justifyContent="center"
      bg='none'
    >
      {createKeyboard(colorMode, processInputLetter, usedLetters)}
    </Container>
  )
}
