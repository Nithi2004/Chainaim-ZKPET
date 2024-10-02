// src/app/components/Home.tsx
import { Box, SimpleGrid, Text } from '@chakra-ui/react';

const Home = () => {
  return (
    <Box>
      <SimpleGrid columns={2} spacing={8} mt={8}>
        <Box
          width="80%"
          bgGradient="linear(to-r, orange.300, orange.400)"
          height="200px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="md"
          mx="auto" // Center the boxes
        >
          <Text color="white" fontSize="lg">ZKPET Deep Composition Prover </Text>    
        </Box>
        <Box
          width="80%"
          bgGradient="linear(to-r, orange.300, orange.400)"
          height="200px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="md"
          mx="auto" // Center the boxes
        >
          <Text color="white" fontSize="lg">ZKPET Domain Registry</Text>
        </Box>
        <Box
          width="80%"
          bgGradient="linear(to-r, orange.300, orange.400)"
          height="200px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="md"
          mx="auto" // Center the boxes
        >
          <Text color="white" fontSize="lg">ZKPET Business Process Prover</Text>  
        </Box>
        <Box
          width="80%"
          bgGradient="linear(to-r, orange.300, orange.400)"
          height="200px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="md"
          mx="auto" // Center the boxes
        >
          <Text color="white" fontSize="lg"> ZKPET Risk Model Prover</Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Home;
