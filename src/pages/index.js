import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Keyboard } from '../components/Keyboard'
import { InputGrid } from '../components/InputGrid'
import { useEffect, useState } from 'react'
import { Toaster } from '../components/Toaster'
import { questionWords } from '../words'

const Index = () => {
  const [question] = useState(questionWords[Math.floor(Math.random() * (questionWords.length))].toUpperCase())
  const [inputLetter, setInputLetter] = useState(null)
  const [toasterMessage, setToasterMessage] = useState(null);
  const processInputLetter = (letter) => {
    setInputLetter(letter)
  }
  const processToasterMessage = toasterMessage => {
    setToasterMessage(toasterMessage)
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
        <InputGrid inputLetter={inputLetter} processToasterMessage={processToasterMessage} question={question} />
      </Main>

      <DarkModeSwitch />
      <Keyboard processInputLetter={processInputLetter} />
    </Container>
  )
}

export default Index
