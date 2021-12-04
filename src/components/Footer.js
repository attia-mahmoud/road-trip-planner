import { Box, Text, Link } from '@chakra-ui/layout';
import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box mt="10">
      <Text m="10" fontSize="0.8em">
        <Link
          href="https://mahmoudattia.com"
          isExternal
          aria-label="Link to my website"
        >
          Created by Mahmoud{' '}
          <FaExternalLinkAlt
            style={{ display: 'inline', marginLeft: '1', height: '12' }}
          />
        </Link>
      </Text>
    </Box>
  );
};

export default Footer;
