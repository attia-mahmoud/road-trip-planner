import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spacer,
  VStack,
  HStack,
  Box,
  Text,
} from '@chakra-ui/react';
import { Alert, AlertIcon } from '@chakra-ui/react';
import { CloseButton } from '@chakra-ui/close-button';
import { Icon } from '@chakra-ui/icon';
import { ScaleFade } from '@chakra-ui/react';
import { FaTrash, FaStar, FaLocationArrow } from 'react-icons/fa';
import { deleteEntry } from '../utils/utils';
import DeleteButton from './DeleteButton';

const Destinations = ({ destinationsState, positionState }) => {
  const [position, setPosition] = positionState;
  const [destinations, setDestinations] = destinationsState;
  const [isOpen, setIsOpen] = React.useState(false);

  const allDestinations = JSON.parse(localStorage.getItem('my_destinations'));

  return (
    <VStack>
      {allDestinations?.length > 0 ? (
        <>
          <Table variant="simple" mb="10">
            <Thead>
              <Tr>
                <Th>Location</Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody fontSize={['0.8em', '1em']}>
              {allDestinations?.map((destination, index) => (
                <Tr key={index}>
                  <Td>
                    <HStack>
                      <Icon
                        as={FaStar}
                        cursor="pointer"
                        color={destination.favorite ? 'yellow' : 'gray.200'}
                        _hover={{
                          color: 'yellow',
                        }}
                        onClick={() => {
                          
                          let items = [...allDestinations];

                          let item = { ...destination };

                          item.favorite = !item.favorite;

                          items[index] = item;

                          localStorage.setItem(
                            'my_destinations',
                            JSON.stringify(items)
                          );
                          setDestinations(items);
                        }}
                      />
                      <Text>{destination.name}</Text>
                    </HStack>
                  </Td>
                  <Td>
                    <Icon
                      as={FaLocationArrow}
                      onClick={() => {
                        setPosition(destination.LatLng);
                        document.getElementById('map').scrollIntoView({
                          top: 0,
                          left: 0,
                          behavior: 'smooth',
                        });
                      }}
                      cursor="pointer"
                      color="green"
                    />
                  </Td>


                  <Td>
                    <Icon
                      as={FaTrash}
                      onClick={() => {
                        deleteEntry(
                          destination,
                          allDestinations,
                          setDestinations
                        );
                        setIsOpen(true);
                      }}
                      color="red"
                      cursor="pointer"
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Spacer />
          <DeleteButton setDestinations={setDestinations} />
          <Box minH="3em">
            {isOpen && (
              <ScaleFade initialScale={0.9} in={isOpen}>
                <Alert
                  fontSize="0.9em"
                  status="success"
                  minW={['15em', '20em']}
                >
                  <AlertIcon />
                  Destination Removed Successfully!
                  <CloseButton
                    onClick={() => setIsOpen(false)}
                    position="absolute"
                    right="8px"
                    top="8px"
                  />
                </Alert>
              </ScaleFade>
            )}
          </Box>
        </>
      ) : null}{' '}
    </VStack>
  );
};

export default Destinations;

