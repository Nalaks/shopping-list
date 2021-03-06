import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Link,
  Heading,
  Text,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Link as RouterLink } from 'react-router-dom'
import { FC } from 'react'

const Header: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box bg={useColorModeValue('blue.400', 'gray.700')} px={4}>
      <Flex h={20} alignItems="center" justifyContent="space-between" mx={8}>
        <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
          <Heading as="h5">Shopping List App</Heading>
        </Link>
        <Flex alignItems="center">
          <Stack direction="row" spacing={6} alignItems="center">
            <Link as={RouterLink} to="/">
              <Text fontSize="xl">Home</Text>
            </Link>
            <Link as={RouterLink} to="/shopping-list">
              <Text fontSize="xl">Shopping List</Text>
            </Link>
            <Link as={RouterLink} to="/about">
              <Text fontSize="xl">About</Text>
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
