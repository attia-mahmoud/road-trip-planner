import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  import {
    ListItem,
    OrderedList,
  } from '@chakra-ui/react'
import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { FaInfoCircle } from 'react-icons/fa'
import { IconButton } from '@chakra-ui/react';


const InfoModal = props => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    return (
      <>
        <IconButton
        size="sm"
        aria-label={`Site Info`}
        as={FaInfoCircle}
        marginRight="2"
        cursor="pointer"
        onClick={onOpen}
        {...props}
        />
  
        <Modal onClose={onClose} isOpen={isOpen} isCentered >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize="2xl">How does it work?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <OrderedList  spacing={3}>
                    <ListItem>Navigate the map to your desired destination.</ListItem>
                    <ListItem>When you have the location you want, press Save Location.</ListItem>
                    <ListItem>A summary of the destination will be displayed under the Destination Summary tab.</ListItem>
                    <ListItem>You can add the location to your favorites or delete it at any time.</ListItem>
                    <ListItem>All data is stored in your browser's local storage so that you can come back to it even if you leave the site.</ListItem>
                </OrderedList>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose} colorScheme="green">Got It</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default InfoModal 