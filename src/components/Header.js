import React from 'react';
import { Heading, Flex } from '@chakra-ui/layout';

const Header = () => {
  return (
    <>
    <Flex w="100%" justify="center">

      <Heading size="4xl" w="100%" textAlign="center" mb="10">
        Road Trip Planner
      </Heading>
    </Flex>
    </>
  );
};

export default Header;
