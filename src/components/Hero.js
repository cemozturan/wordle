import { Flex, Heading, Box, Text } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/layout'

export const Hero = ({ title }) => (
  <Flex justifyContent="center" height="12vh">
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
