import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  HStack,
} from '@chakra-ui/react';
import { Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react';
import { Box, Flex, Text, VStack } from '@chakra-ui/layout';
import { Icon } from '@chakra-ui/icon';
import { FaStar } from 'react-icons/fa';

const Summary = ({ destinationsState }) => {
  const allDestinations = JSON.parse(localStorage.getItem('my_destinations'));

  return (
    <div>
      <Accordion defaultIndex={[0]} fontSize={['0.8em', '1em']}>
        {allDestinations?.map((destination, index) => {
          return (
            <AccordionItem key={index}>
              <h2>
                <AccordionButton _expanded={{ fontWeight: '700' }}>
                  <Box flex="1" textAlign="left" m="1">
                  <HStack>

                  <Icon 
                    as={FaStar}
                    color="yellow"
                    visibility={destination.favorite ? "visible" : "hidden"}
                    
                  />
                    <Text fontSize="1.2em" m={1.5}>
                      {destination.name}
                    </Text>
                  </HStack>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <VStack>
                  <Text
                    as="h2"
                    textAlign="left"
                    w="100%"
                    fontWeight="600"
                    fontSize="1.1em"
                  >
                    Location Details
                  </Text>
                  <Flex
                    justify="space-around"
                    w="100%"
                    wrap="wrap"
                    flexDirection={['column', 'row']}
                  >
                    <Stat m={['10', 0]}>
                      <StatLabel>Longitude</StatLabel>
                      <StatNumber>
                        {Math.round(destination.LatLng.lat * 100) / 100}
                      </StatNumber>
                      <StatHelpText>Degrees</StatHelpText>
                    </Stat>
                    <Stat>
                      <StatLabel>Latitude</StatLabel>
                      <StatNumber>
                        {Math.round(destination.LatLng.lng * 100) / 100}
                      </StatNumber>
                      <StatHelpText>Degrees</StatHelpText>
                    </Stat>
                  </Flex>
                </VStack>
                {/* trip details */}
                <VStack mt="10">
                  <Text
                    as="h2"
                    textAlign="left"
                    w="100%"
                    fontWeight="600"
                    fontSize="1.1em"
                  >
                    Trip Details
                  </Text>
                  <Flex
                    justify="space-around"
                    w="100%"
                    wrap="wrap"
                    flexDirection={['column', 'row']}
                  >
                    <Stat m={['10', 0]}>
                      <StatLabel>Distance From Your Location</StatLabel>
                      <StatNumber>{destination.distance}</StatNumber>
                      <StatHelpText>KM</StatHelpText>
                    </Stat>
                    <Stat>
                      <StatLabel>Driving Duration</StatLabel>
                      <StatNumber>{destination.duration}</StatNumber>
                      <StatHelpText>Hours</StatHelpText>
                    </Stat>
                  </Flex>
                </VStack>

                {/* points of interest */}
                <VStack mt="10">
                  <Text
                    as="h2"
                    textAlign="left"
                    w="100%"
                    fontWeight="600"
                    fontSize="1.1em"
                  >
                    {destination.POI && 'Nearby Points of Interest'}
                  </Text>
                  <Flex wrap="wrap">
                    {destination.POI?.map((point, index) => {
                      return (
                        <Stat m="10" key={index}>
                          <StatLabel fontSize="0.8em" fontStyle="italic">
                            {point.type.toUpperCase()}
                          </StatLabel>
                          <StatNumber fontSize="01em">{point.name}</StatNumber>
                          <StatHelpText>
                            {point.distance} metres away
                          </StatHelpText>
                        </Stat>
                      );
                    })}
                  </Flex>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default Summary;
