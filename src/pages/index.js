import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Keyboard } from '../components/Keyboard'
import { InputGrid } from '../components/InputGrid'
import { useEffect, useState } from 'react'
import { Toaster } from '../components/Toaster'
import { questionWords } from '../words'
import { LETTER_STATUS } from '../constants'

const Index = () => {
  const [question] = useState(questionWords[Math.floor(Math.random() * (questionWords.length))].toUpperCase())
  const [inputLetter, setInputLetter] = useState(null)
  const [toasterMessage, setToasterMessage] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [usedLetters, setUsedLetters] = useState([])
  const [mobileHeightValue, setMobileHeightValue] = useState('100vh')
  const processInputLetter = (letter) => {
    setInputLetter(letter)
  }
  const processToasterMessage = (toasterMessage) => {
    setToasterMessage(toasterMessage)
  }
  const processUsedLetters = letters => {
    const newUsedLetters = [...usedLetters]
    for (let index = 0; index < letters.length; index++) {
      const newLetter = letters[index];
      const alreadyUsedLetter = usedLetters.find(x => x.value === newLetter.value)
      if (alreadyUsedLetter) {
        if (newLetter.status === LETTER_STATUS.CORRECT) {
          alreadyUsedLetter.status === LETTER_STATUS.CORRECT
        }
        continue
      }
      newUsedLetters.push(newLetter)
    }
    setUsedLetters(newUsedLetters)
  }
  const showAnswerToUser = () => {
    setToasterMessage(null)
    setShowAnswer(true)
  }

  useEffect(() => {
    setMobileHeightValue(`${window.innerHeight}px`)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setToasterMessage(null)
    }, 1250)
    return () => {
      clearTimeout(timer)
    }
  }, [toasterMessage])

  return (
    <Container height={{
      base: mobileHeightValue,
      md: '100vh',
    }}>
      <Hero />
      {showAnswer && <Toaster message={question} />}
      {toasterMessage && <Toaster message={toasterMessage} />}
      <Main>
        <InputGrid
          position='relative'
          inputLetter={inputLetter}
          processToasterMessage={processToasterMessage}
          question={question}
          processUsedLetters={processUsedLetters}
          showAnswerToUser={showAnswerToUser}
        />
      </Main>

      <DarkModeSwitch />
      <Keyboard processInputLetter={processInputLetter} usedLetters={usedLetters} />
    </Container>
  )
}

export default Index
