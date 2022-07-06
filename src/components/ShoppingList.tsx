import { FC, useState } from 'react'
import { useQuery } from 'react-query'
import {
  CircularProgress,
  Center,
  Flex,
  Switch,
  FormControl,
  FormLabel,
  Select,
  Grid,
  GridItem,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { IShoppingListItem } from '../types/types'
import ShoppingListItem from './ShoppingListItem'
import { getShoppingListItems } from '../lib/api'

const ShoppingList: FC = () => {
  /* Destructuring the data from the useQuery hook. */
  const { data, isLoading, isError } = useQuery(
    'shoppingList',
    getShoppingListItems,
  )

  const [format, setFormat] = useState(false)
  const handleToggleFormat = () => {
    setFormat(!format)
  }

  const [filterList, setFilterList] = useState<string>('all')
  const handleFilter = (filter: string) => {
    setFilterList(filter)
  }
  const filterFn = (item: IShoppingListItem) => {
    if (filterList === 'all') {
      return true
    }
    if (filterList === 'done') {
      return item.done
    }
    if (filterList === 'not') {
      return !item.done
    }
    return false
  }

  const [sortList, setSortList] = useState<string>('id')
  const handleSort = (sort: string) => {
    setSortList(sort)
  }
  const sortFn = (a: IShoppingListItem, b: IShoppingListItem) => {
    if (sortList === 'id') {
      if (a.id! < b.id!) {
        return -1
      }
      if (a.id! > b.id!) {
        return 1
      }
    }
    if (sortList === 'title') {
      const aTitle = a.title.toLowerCase()
      const bTitle = b.title.toLowerCase()
      if (aTitle < bTitle) {
        return -1
      }
      if (aTitle > bTitle) {
        return 1
      }
    }
    if (sortList === 'unit' && a.unit && b.unit) {
      const aUnit = a.unit.toLowerCase()
      const bUnit = b.unit.toLowerCase()
      if (aUnit < bUnit) {
        return -1
      }
      if (aUnit > bUnit) {
        return 1
      }
    }
    return 0
  }

  return (
    <Flex align="center" justify="center" direction="column">
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
      <Grid templateColumns="repeat(3, 1fr)" gap={6} my={4}>
        <GridItem w="100%">
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="filter" mb="0">
              Filter:
            </FormLabel>
            <Select id="filter" onChange={(e) => handleFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="done">Done</option>
              <option value="not">Not Done</option>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem w="100%">
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="sort" mb="0">
              Sort:
            </FormLabel>
            <Select id="sort" onChange={(e) => handleSort(e.target.value)}>
              <option value="id">By Id</option>
              <option value="title">By Title</option>
              <option value="unit">By Unit</option>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem w="100%" display="flex" alignItems="center">
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="row-column" mb="0">
              Layout:
            </FormLabel>
            <Switch id="row-column" onChange={handleToggleFormat} />
          </FormControl>
        </GridItem>
      </Grid>
      <Flex
        direction={format ? 'column' : 'row'}
        align="center"
        justify="center"
        wrap="wrap"
      >
        {data
          ?.filter(filterFn)
          .sort(sortFn)
          .map((item: IShoppingListItem) => (
            <ShoppingListItem key={item.title} item={item} />
          ))}{' '}
      </Flex>
    </Flex>
  )
}

export default ShoppingList
