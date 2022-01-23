import { Flex, Heading, Box, Text, Link } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/layout'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { TITLE } from '../constants'

export const Hero = () => (
  <Flex justifyContent="center" height={{
    base: '3vh',
    sm: '6vh',
    md: '12vh',
  }}>
    <Box textAlign='center'>
      <Heading fontSize={{
        base: '18px',
        md: '36px', 
      }}>
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
