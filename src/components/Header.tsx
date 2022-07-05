import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Link,
  Heading,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Link as RouterLink } from 'react-router-dom'

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box bg={useColorModeValue('teal.400', 'gray.900')} px={4}>
      <Flex h={20} alignItems="center" justifyContent="space-between" mx={8}>
        <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
          <Heading as="h5">Shopping List</Heading>
        </Link>
        <Flex alignItems="center">
          <Stack direction="row" spacing={6} alignItems="center">
            <Link as={RouterLink} to="/">
              Home
            </Link>
            <Link as={RouterLink} to="/about">
              About
            </Link>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Header
