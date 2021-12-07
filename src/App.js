import React from 'react';
import { ChakraProvider, Box, Grid, theme, HStack } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import './App.css';

import Page from './components/Page';
import InfoModal from './components/InfoModal';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
        <HStack justify="space-between">
          <InfoModal size="10"/>
          <ColorModeSwitcher  />
        </HStack>
          <Page />
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
