import { Button, Text, Box, useColorMode, SimpleGrid, keyframes } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { TOASTER_MESSAGES, LETTER_STATUS, COLOR_VALUES } from '../constants';
import { nonQuestionWords, questionWords } from '../words';
import { Container } from './Container'

const shake = keyframes`
    10%,90% {transform: translateX(-1px);}
    20%,80% {transform: translateX(2px);}
    30%,50%,70% { transform: translateX(-4px);}
    40%,60% {transform: translateX(4px);
  `
const animation = `${shake} 0.6s linear`

const getTileBorderColor = (letter, colors) => {
  if (!letter.status) {
    return letter.value ? colors.nonEmptyTileBorder : colors.emptyTileBorder
  }
  return colors[letter.status]
}

const generateInputGrid = (colorMode, inputRows, currentRowIndex, shakeIt) => {
  const colors = COLOR_VALUES[colorMode];
  return (
    <SimpleGrid columns={5} spacing={1}>
      {inputRows.map((row, rowIndex) => {
        return row.map((letter, index) => 
          <Box
            key={index}
            borderWidth='2px'
            borderColor={getTileBorderColor(letter, colors)}
            bg={!letter.status ? colors.bg : colors[letter.status]}
            height='62px'
            w='62px'
            display='flex'
            justifyContent='center'
            animation={shakeIt && rowIndex === currentRowIndex ? animation : 'none'}
            alignItems='center'>
            <Text
              color={!letter.status ? colors.nonEvaluatedText : colors.evaluatedText}
              fontSize='4xl'
              fontWeight='bold'>
              {letter.value}
            </Text>
          </Box>)
      })}
    </SimpleGrid>
  )
};

const updateRowsWithInput = (letter, rows, currentRowIndex) => {
  const currentRow = rows[currentRowIndex];
  for (let index = 0; index < currentRow.length; index++) {
    if (!currentRow[index].value) {
      currentRow[index].value = letter
      break;
    }
  }
  return [...rows];
}

const updateRowsWithDeletion = (rows, currentRowIndex) => {
  const currentRow = rows[currentRowIndex];
  for (let index = currentRow.length - 1; index >= 0; index--) {
    if (currentRow[index].value) {
      currentRow[index].value = ''
      break;
    }
  }
  return [...rows];
}

const processWordSubmission = (rows, currentRowIndex, question) => {
  const currentRow = rows[currentRowIndex]
  const answer = currentRow.reduce((prevValue, currentLetter) => prevValue + currentLetter.value,'')
  if (answer === question) {
    currentRow.map(letter => letter.status = LETTER_STATUS.CORRECT)
    return {
      rows: [...rows],
      message: TOASTER_MESSAGES.SUCCESS[currentRowIndex]
    }
  }
  if (!nonQuestionWords.includes(answer.toLowerCase())
    && !questionWords.includes(answer.toLowerCase())) {
    return {
      error: true,
      message: TOASTER_MESSAGES.NOT_IN_WORD_LIST
    }
  }
  for (let index = 0; index < currentRow.length; index++) {
    const letter = currentRow[index].value;
    if (question[index] === letter) {
      currentRow[index].status = LETTER_STATUS.CORRECT
    } else if (question.includes(letter)) {
      currentRow[index].status = LETTER_STATUS.PRESENT
    } else {
      currentRow[index].status = LETTER_STATUS.ABSENT
    }
  }
  return {
    rows: [...rows]
  }
}

export const InputGrid = ({ inputLetter, processToasterMessage, question, processUsedLetters }) => {
  const { colorMode } = useColorMode()
  const [inputRows, setInputRows] = useState(Array.from({ length: 6 }, () => (
    Array.from({ length: 5 }, ()=> ({ value: '', status: null }))
  )))
  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const [found, setFound] = useState(false)
  const [shakeIt, setShakeIt] = useState(false)

  useEffect(() => {
    if (!inputLetter) { return }
    if (found) {
      return
    }
    const { value } = inputLetter
    if (value === 'Enter') {
      if (inputRows[currentRowIndex][4].value) {
        const { rows, message, error } = processWordSubmission(inputRows, currentRowIndex, question)
        if (error) {
          processToasterMessage(message)
          setShakeIt(true)
          setTimeout(() => {
            setShakeIt(false)
          }, 600)
        } else {
          setInputRows(rows)
          processUsedLetters(inputRows[currentRowIndex])
          if (message) {
            processToasterMessage(message)
            setFound(true)
          } else {
            setCurrentRowIndex(currentRowIndex + 1)
          }
        }
      } else {
        processToasterMessage(TOASTER_MESSAGES.NOT_ENOUGH_LETTERS)
        setShakeIt(true)
        setTimeout(() => {
          setShakeIt(false)
        }, 600)
      }
    } else if ((typeof value) === 'string') {
      setInputRows(inputRows => updateRowsWithInput(value, inputRows, currentRowIndex));
    } else {
      setInputRows(inputRows => updateRowsWithDeletion(inputRows, currentRowIndex))
    }
  }, [inputLetter])

  return (
    <Container
      flexDirection="column"
      position="fixed"
      width="100%"
      maxWidth="48rem"
      pt="3rem"
      mt='0 !important'
      justifyContent="center"
      bg='none'
    >
      {generateInputGrid(colorMode, inputRows, currentRowIndex, shakeIt)}
    </Container>
  )
}
