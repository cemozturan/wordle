import { Flex, Heading, Box, Text, Link } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/layout'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { TITLE } from '../constants'

export const Hero = () => (
  <Flex justifyContent="center" height={{
    base: '3vh', // 0-48em
    sm: '6vh', // 0-48em
    md: '12vh', // 48em-80em
  }}>
    <Box textAlign='center'>
      <Heading fontSize="6vw">
        {TITLE}
      </Heading>
      <Divider />
      <Text fontSize='12px'>
        The original Wordle is{' '}
        <Link color='teal.500' href='https://www.powerlanguage.co.uk/wordle/' isExternal>
          here <ExternalLinkIcon />
        </Link>
      </Text>

    </Box>
  </Flex>
)
