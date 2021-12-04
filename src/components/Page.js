import React from 'react';
import { VStack } from '@chakra-ui/react';
import Map from './Map';
import Header from './Header';
import Footer from './Footer';
import Tabs from './Tabs';

const Page = () => {
  const [destinations, setDestinations] = React.useState(
    JSON.parse(localStorage.getItem('my_destinations')) || []
  );
  const [position, setPosition] = React.useState(null);

  return (
    <VStack spacing={8}>
      <Header />
      <Map
        destinationsState={[destinations, setDestinations]}
        positionState={[position, setPosition]}
      />
      <Tabs
        destinationsState={[destinations, setDestinations]}
        positionState={[position, setPosition]}
      />

      <Footer />
    </VStack>
  );
};

export default Page;
