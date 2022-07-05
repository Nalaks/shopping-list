import { FC } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Button,
  FormControl,
  FormLabel,
  Switch,
  useDisclosure,
  Flex,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { ShoppingListItemProps } from '../types/types'
import { deleteShoppingListItem, updateShoppingListItem } from '../lib/api'
import ConfirmModal from './ConfirmModal'

const ShoppingListItem: FC<ShoppingListItemProps> = ({ item }) => {
  const queryClient = useQueryClient()
  const mutationDelete = useMutation(deleteShoppingListItem, {
    onSuccess: () => queryClient.invalidateQueries('shoppingList'),
  })
  const mutationUpdate = useMutation(updateShoppingListItem, {
    onSuccess: () => queryClient.invalidateQueries('shoppingList'),
  })

  const { isOpen, onOpen, onClose } = useDisclosure()

  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate(`/shopping-list/${item.id}`)
  }

  const onDelete = () => {
    mutationDelete.mutate(item.id!)
  }
  return (
    <Center p={4}>
      <Box
        w="30vw"
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow="2xl"
        rounded="md"
        p={6}
        overflow="hidden"
      >
        <ConfirmModal onDelete={onDelete} onClose={onClose} isOpen={isOpen} />
        <Stack>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize="2xl"
            fontFamily="body"
            textAlign="center"
            mb={4}
          >
            Title: {item.title}
          </Heading>
          <Flex align="center">
            <Text
              color="blue.500"
              background={useColorModeValue('gray.200', 'gray.700')}
              p={2}
              borderRadius="xl"
              mr={2}
            >
              Description:
            </Text>
            <Text>{item.description}</Text>
          </Flex>
          <Flex align="center">
            <Text
              color="blue.500"
              background={useColorModeValue('gray.200', 'gray.700')}
              p={2}
              borderRadius="xl"
              mr={2}
            >
              Amount:
            </Text>
            <Text>{item.amount}</Text>
          </Flex>
          <Flex align="center">
            <Text
              color="blue.500"
              background={useColorModeValue('gray.200', 'gray.700')}
              p={2}
              borderRadius="xl"
              mr={2}
            >
              Unit:
            </Text>
            <Text>{item.unit}</Text>
          </Flex>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="done" mb="0">
              Done?
            </FormLabel>
            <Switch
              id="done"
              isChecked={item.done}
              onChange={() =>
                mutationUpdate.mutate({ ...item, done: !item.done })
              }
            />
          </FormControl>
          <Flex direction="row">
            <Button colorScheme="teal" onClick={handleNavigate} mr={4}>
              Update
            </Button>
            <Button colorScheme="orange" onClick={onOpen}>
              Delete
            </Button>
          </Flex>
        </Stack>
      </Box>
    </Center>
  )
}

export default ShoppingListItem
