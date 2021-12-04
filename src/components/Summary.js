import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react';
import { Box, Flex, Text, VStack } from '@chakra-ui/layout';

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
                  <Box flex="1" textAlign="left">
                    <Text fontSize="1.3em" m={1.5}>
                      {destination.name}
                    </Text>
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
                    {destination.POI?.map(point => {
                      return (
                        <Stat m="10">
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
