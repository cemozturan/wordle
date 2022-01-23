import { Text, Box, useColorMode, SimpleGrid, keyframes } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { TOASTER_MESSAGES, LETTER_STATUS, COLOR_VALUES } from '../constants';
import { findAllIndexesOfChar } from '../utils/find-char-indexes';
import { nonQuestionWords, questionWords } from '../words';
import { Container } from './Container'

const shake = keyframes`
  10%,90% {transform: translateX(-1px);}
  20%,80% {transform: translateX(2px);}
  30%,50%,70% { transform: translateX(-4px);}
  40%,60% {transform: translateX(4px);
`
const shakeAnimation = `${shake} 0.6s linear`

const bounce = keyframes`
  0%, 20% {transform: translateY(0);}
  40% {transform: translateY(-30px);}
  50% {transform: translateY(5px);}
  60% {transform: translateY(-15px);}
  80% {transform: translateY(2px);}
  100% {transform: translateY(0);}
`
const bounceAnimation = `${bounce} 1s`

const getTileBorderColor = (letter, colors) => {
  if (!letter.status) {
    return letter.value ? colors.nonEmptyTileBorder : colors.emptyTileBorder
  }
  return colors[letter.status]
}

const getAnimationForRow = (shakeIt, bounceIt, rowIndex, currentRowIndex) => {
  if (rowIndex === currentRowIndex) {
    if (shakeIt) {
      return shakeAnimation
    } else if (bounceIt) {
      return bounceAnimation
    }
  }
  return 'none'
}

const generateInputGrid = (colorMode, inputRows, currentRowIndex, shakeIt, bounceIt) => {
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
            animation={getAnimationForRow(shakeIt, bounceIt, rowIndex, currentRowIndex)}
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
  const indexesAlreadyMarked = []
  for (let index = 0; index < currentRow.length; index++) {
    const letter = currentRow[index].value;
    if (question[index] === letter) {
      currentRow[index].status = LETTER_STATUS.CORRECT
      indexesAlreadyMarked.push(index)
    }
  }
  for (let index = 0; index < currentRow.length; index++) {
    const letter = currentRow[index].value;
    if (question.includes(letter)) {
      const indexesInQuestion = findAllIndexesOfChar(letter, question)
      const unmarkedIndex = indexesInQuestion.find(x => !indexesAlreadyMarked.includes(x))
      if (unmarkedIndex >= 0) {
        currentRow[index].status = LETTER_STATUS.PRESENT
        indexesAlreadyMarked.push(unmarkedIndex)  
      } else {
        currentRow[index].status = currentRow[index].status || LETTER_STATUS.ABSENT
      }
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
  const [failed, setFailed] = useState(false)
  const [shakeIt, setShakeIt] = useState(false)

  useEffect(() => {
    if (!inputLetter) { return }
    if (found || failed) {
      return
    }
    const { value } = inputLetter
    if (value === 'ENTER') {
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
            if (currentRowIndex === inputRows.length - 1) {
              processToasterMessage(question)
              setFailed(true)
            }
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
      mt="3rem !important"
      justifyContent="center"
      bg='none'
    >
      {generateInputGrid(colorMode, inputRows, currentRowIndex, shakeIt, found)}
    </Container>
  )
}
