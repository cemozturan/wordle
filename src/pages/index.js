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
  const [usedLetters, setUsedLetters] = useState([])
  const processInputLetter = (letter) => {
    setInputLetter(letter)
  }
  const processToasterMessage = toasterMessage => {
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

  useEffect(() => {
    if (toasterMessage) {
      setTimeout(() => {
        setToasterMessage(null)
      }, 1000)
    }
  }, [toasterMessage])

  return (
    <Container height="100vh">
      <Hero />
      <Main>
        {toasterMessage && <Toaster message={toasterMessage} />}
        <InputGrid
          inputLetter={inputLetter}
          processToasterMessage={processToasterMessage}
          question={question}
          processUsedLetters={processUsedLetters}
        />
      </Main>

      <DarkModeSwitch />
      <Keyboard processInputLetter={processInputLetter} usedLetters={usedLetters} />
    </Container>
  )
}

export default Index
