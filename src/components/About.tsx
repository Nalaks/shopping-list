import { Flex, Heading, Text, Link } from '@chakra-ui/react'
import { FC } from 'react'

const About: FC = () => {
  return (
    <Flex direction="column" align="center" justify="center" mt={16}>
      <Heading as="h2">Shopping List App made by Stefan Kalan</Heading>
      <Text mt={6}>Final project for my Web Development course</Text>
      <Text mt={6}>
        Github:{' '}
        <Link href="https://github.com/Nalaks" color="blue.500" target="_blank">
          Nalaks
        </Link>
      </Text>
    </Flex>
  )
}

export default About
