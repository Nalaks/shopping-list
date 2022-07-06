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
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { FC, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { createShoppingListItem } from '../lib/api'
import units from '../lib/helper'
import { IFormError } from '../types/types'

const ShoppingListForm: FC = () => {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    unit: '',
    done: false,
  })

  const [formError, setFormError] = useState<IFormError | null>(null)
  /* A hook that is used to create a mutation. It takes two arguments, the first is the mutation
  function and the second is an object with options. The onSuccess option is a callback that is
  called when the mutation is successful. In this case, it is invalidating the shoppingList query. */
  const mutation = useMutation(createShoppingListItem, {
    onSuccess: () => queryClient.invalidateQueries('shoppingList'),
  })

  const handleSubmit = () => {
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
    mutation.mutate(formData)
    setFormData({
      title: '',
      description: '',
      amount: '',
      unit: '',
      done: false,
    })
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
      <Stack spacing={4} py={6} px={6} width="30vw">
        <Stack align="center">
          <Heading fontSize="4xl">Add new item</Heading>
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
                placeholder="Eggs"
                required
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
                placeholder="Get free range eggs"
              />
            </FormControl>
            <FormControl id="amount">
              <FormLabel>Amount*</FormLabel>
              <Input
                type="number"
                value={formData.amount}
                onChange={handleAmountChange}
                placeholder="2"
                required
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
                onClick={handleSubmit}
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

export default ShoppingListForm
