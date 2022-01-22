import { Flex, Heading, Box, Text } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/layout'

export const Hero = ({ title }) => (
  <Flex justifyContent="center" height={{
    base: '1vh', // 0-48em
    md: '12vh', // 48em-80em
  }}>
    <Box textAlign='center'>
      <Heading fontSize="4vw">
        {title}
      </Heading>
      <Divider />
    </Box>
  </Flex>
)

Hero.defaultProps = {
  title: 'WORDLE',
}
