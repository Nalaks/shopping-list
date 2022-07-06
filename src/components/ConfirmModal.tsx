import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'
import { FC } from 'react'
import { ModalProps } from '../types/types'

const ConfirmModal: FC<ModalProps> = ({ onDelete, isOpen, onClose }) => {
  const handleDelete = () => {
    onDelete()
    onClose()
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure you want to delete this item?</ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleDelete}>
            Yes
          </Button>
          <Button colorScheme="green" onClick={onClose}>
            No
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmModal
