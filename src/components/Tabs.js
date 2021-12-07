import React from 'react';
import {
  Tabs as ChTabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import Destinations from './Destinations';
import Summary from './Summary';
import { Text } from '@chakra-ui/layout';

const Tabs = ({ destinationsState, positionState }) => {
  const allDestinations = JSON.parse(localStorage.getItem('my_destinations'));

  return (
    <div id="tabs">
      <ChTabs
        align="center"
        isFitted
        w={['90vw', '55vw']}
        variant="enclosed"
        size="lg"
      >
        <TabList>
          <Tab>All Destinations</Tab>
          <Tab>Destination Summaries</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {allDestinations ? (
              <>
                <Text
                  fontSize="3xl"
                  textAlign="left"
                  fontWeight="600"
                  mt="5"
                  mb="5"
                >
                  {allDestinations.length} Pins
                </Text>
                <Destinations
                  destinationsState={destinationsState}
                  positionState={positionState}
                />
              </>
            ) : (
              <Text as="h1">Add a Destination</Text>
            )}
          </TabPanel>
          <TabPanel>
            {allDestinations ? (
              <Summary destinationsState={destinationsState} />
            ) : (
              <Text as="h1">Add a Destination</Text>
            )}
          </TabPanel>
        </TabPanels>
      </ChTabs>
    </div>
  );
};

export default Tabs;
