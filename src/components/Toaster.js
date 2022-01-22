import { Flex, Box, useColorMode } from '@chakra-ui/react'

export const Toaster = ({ message }) => {
  const { colorMode } = useColorMode()
  const bgColor = { light: '#121213', dark: '#d7dadc' }
  const color = { light: 'white', dark: 'black' }

  return (
    <Flex justifyContent="center">
      <Box
        bg={bgColor[colorMode]} px={4} py={2}
        color={color[colorMode]} textAlign='center'
        borderRadius='md'
        fontWeight='bold'>
        {message}
      </Box>
    </Flex>)
  }
