import { Stack } from '@chakra-ui/react'

export const Main = (props) => (
  <Stack
    width="100%"
    maxWidth="48rem"
    position='relative'
    top={{
      base: '-32vh',
      md: '-33%',
    }}
    {...props}
  />
)
