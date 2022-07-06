import { useParams, useNavigate } from 'react-router-dom'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Textarea,
  Select,
  Center,
  CircularProgress,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { FC, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getShoppingListItems, updateShoppingListItem } from '../lib/api'
import units from '../lib/helper'
import { IFormError, IShoppingListItem } from '../types/types'

const ShoppingListEdit: FC = () => {
  const { itemId } = useParams()
  const navigate = useNavigate()

  const queryClient = useQueryClient()
  const { data, isLoading, isError } = useQuery(
    'shoppingList',
    getShoppingListItems,
  )
  const [formData, setFormData] = useState<IShoppingListItem>(
    data!.find((item) => item.id === +itemId!) as IShoppingListItem,
  )

  const [formError, setFormError] = useState<IFormError | null>(null)

  const mutation = useMutation(updateShoppingListItem, {
    onSuccess: () => queryClient.invalidateQueries('shoppingList'),
  })

  const handleUpdate = () => {
    if (formData.title.length === 0) {
      setFormError({ title: 'The title cannot be empty' })
      return
    }
    if (+formData.amount < 0 || formData.amount === '') {
      setFormError({
        amount: 'Amount has to be greater than 0',
      })
      return
    }
    mutation.mutate(formData!)
    navigate('/')
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormError(null)
    setFormData({ ...formData, title: e.target.value })
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormError(null)
    setFormData({ ...formData, amount: e.target.value })
  }
  return (
    <Flex
      align="center"
      justify="center"
      bg={useColorModeValue('gray.100', 'gray.800')}
    >
      {isLoading && (
        <Center py={6}>
          <CircularProgress isIndeterminate color="blue.300" size="120px" />
        </Center>
      )}
      {isError && (
        <Alert status="error">
          <AlertIcon />
          There was an error processing your request
        </Alert>
      )}
      <Stack spacing={4} py={6} px={6} width="30vw">
        <Stack align="center">
          <Heading fontSize="4xl">Update item</Heading>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <Stack spacing={2}>
            <FormControl id="title">
              <FormLabel>Title*</FormLabel>
              <Input
                type="text"
                onChange={handleTitleChange}
                value={formData.title}
              />
            </FormControl>
            {formError?.title && (
              <Alert status="error">
                <AlertIcon />
                {formError.title}
              </Alert>
            )}
            <FormControl id="description">
              <FormLabel>Description</FormLabel>
              <Textarea
                rows={4}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                value={formData.description}
              />
            </FormControl>
            <FormControl id="amount">
              <FormLabel>Amount*</FormLabel>
              <Input
                type="number"
                value={formData.amount}
                onChange={handleAmountChange}
              />
            </FormControl>
            {formError?.amount && (
              <Alert status="error">
                <AlertIcon />
                {formError.amount}
              </Alert>
            )}
            <FormControl>
              <FormLabel>Unit</FormLabel>
              <Select
                onChange={(e) =>
                  setFormData({ ...formData, unit: e.target.value })
                }
                placeholder="Select unit"
                defaultValue={formData.unit}
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Stack spacing={4}>
              <small>* fields are required</small>
              <Button
                bg="blue.400"
                color="white"
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleUpdate}
              >
                Add
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default ShoppingListEdit
