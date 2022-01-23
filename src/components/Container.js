import { Flex, useColorMode } from '@chakra-ui/react'

export const Container = (props) => {
  const { colorMode } = useColorMode()
  const bgColor = { light: 'white', dark: '#121213' }
  const color = { light: 'black', dark: '#d7dadc' }
  
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
    />
  )
}
