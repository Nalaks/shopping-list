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
} from '@chakra-ui/react'
import { FC, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { createShoppingListItem } from '../lib/api'
import units from '../lib/helper'

const ShoppingListForm: FC = () => {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    unit: '',
    done: false,
  })

  const mutation = useMutation(createShoppingListItem, {
    onSuccess: () => queryClient.invalidateQueries('shoppingList'),
  })

  const handleSubmit = () => {
    mutation.mutate(formData)
    setFormData({
      title: '',
      description: '',
      amount: '',
      unit: '',
      done: false,
    })
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
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                value={formData.title}
                placeholder="Nutmeg"
                required
              />
            </FormControl>
            <FormControl id="description">
              <FormLabel>Description</FormLabel>
              <Textarea
                rows={4}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                value={formData.description}
                placeholder="in aisle 6"
              />
            </FormControl>
            <FormControl id="amount">
              <FormLabel>Amount*</FormLabel>
              <Input
                type="number"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                placeholder="12"
                required
              />
            </FormControl>
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
