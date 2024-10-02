import { Box, Button, Text, Input, Textarea, Divider, FormControl, FormLabel, Select, Flex } from '@chakra-ui/react';
import { useState } from 'react';

const Financiers = () => {
  const [financierName, setFinancierName] = useState('');
  const [financierAddress, setFinancierAddress] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('bpmn'); // Default is BPMN
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  // Risk Model Template
  const [selectedRiskModel, setSelectedRiskModel] = useState('actus'); // Default is ACTUS
  
  // Base Contract Template
  const [selectedBaseContractTemplate, setSelectedBaseContractTemplate] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleApprove = () => {
    alert('Financier details approved');
  };

  const handleRiskModelApprove = () => {
    alert('Risk model approved');
  };

  const handleSubmitBaseContractTemplate = () => {
    alert('Base contract template submitted');
  };

  return (
    <Box p={6}>
      {/* Financier Details Section */}
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Financier Details</Text>

      <Box mb={8}>
        <FormControl mb={4}>
          <FormLabel fontWeight="bold">Financier Name</FormLabel>
          <Input
            placeholder="Enter Financier Name"
            value={financierName}
            maxWidth="300px" // Setting max width to 300px
            borderRadius="md"
            focusBorderColor="teal.500"
            onChange={(e) => setFinancierName(e.target.value)}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel fontWeight="bold">Financier Address</FormLabel>
          <Textarea
            placeholder="Enter Financier Address"
            value={financierAddress}
            maxWidth="300px" // Setting max width to 300px
            borderRadius="md"
            focusBorderColor="teal.500"
            onChange={(e) => setFinancierAddress(e.target.value)}
          />
        </FormControl>
      </Box>

      {/* Divider */}
      <Divider borderColor="black" mb={8} />

      {/* SCF Business Process Template Upload */}
      <Box mb={8}>
        <FormControl mb={4}>
          <FormLabel fontWeight="bold">SCF Business Process Template</FormLabel>
          <Select
            placeholder="Select Template Type"
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            maxWidth="300px" // Setting max width to 300px
            borderRadius="md"
            focusBorderColor="teal.500"
            mb={4}
          >
            <option value="bpmn">BPMN</option>
            <option value="xml">XML</option>
            <option value="json">JSON</option>
          </Select>

          <Flex
            direction="column"
            alignItems="center"
            p={4}
            borderWidth={2}
            borderStyle="dashed"
            borderColor="gray.300"
            borderRadius="md"
            _hover={{ borderColor: 'teal.500' }}
            transition="border-color 0.2s ease"
            maxWidth="300px" // Setting max width to 300px for the flex container as well
          >
            <Input
              type="file"
              accept=".bpmn,.xml,.json"
              onChange={handleFileChange}
              cursor="pointer"
              opacity={0}
              position="absolute"
              zIndex={1}
              width="100%"
              height="100%"
            />
            <Text fontSize="sm" color="gray.500" zIndex={0}>
              Drag and drop your file here, or click to select
            </Text>
            {uploadedFile && (
              <Text mt={2} fontSize="sm" color="teal.600">Uploaded: {uploadedFile.name}</Text>
            )}
          </Flex>
        </FormControl>
      </Box>

      {/* Approve Button */}
      <Button
        colorScheme="green"
        size="lg"
        maxWidth="300px" // Setting max width to 300px
        borderRadius="md"
        onClick={handleApprove}
      >
        Approve
        
      </Button>

      {/* Divider */}
      <Divider borderColor="black" mb={8} />

      {/* Risk Model Template Section */}
      <Box mb={8}>
        <FormControl mb={4}>
          <FormLabel fontWeight="bold">Risk Model Template</FormLabel>
          <Select
            placeholder="Select Risk Model Template"
            value={selectedRiskModel}
            onChange={(e) => setSelectedRiskModel(e.target.value)}
            maxWidth="300px" // Setting max width to 300px
            borderRadius="md"
            focusBorderColor="teal.500"
            mb={4}
          >
            <option value="actus">ACTUS</option>
            <option value="model-2">Model 2</option>
            <option value="model-3">Model 3</option>
          </Select>
        </FormControl>

        <Button
          colorScheme="green"
          size="lg"
          maxWidth="300px" // Setting max width to 300px
          borderRadius="md"
          onClick={handleRiskModelApprove}
        >
          Approve
        </Button>
      </Box>

      {/* Divider */}
      <Divider borderColor="black" mb={8} />

      {/* Base Contract Template Section */}
      <Box mb={8}>
        <FormControl mb={4}>
          <FormLabel fontWeight="bold">Create Base Contract Template</FormLabel>
          <Select
            placeholder="Select Base Contract Template"
            value={selectedBaseContractTemplate}
            onChange={(e) => setSelectedBaseContractTemplate(e.target.value)}
            maxWidth="300px" // Setting max width to 300px
            borderRadius="md"
            focusBorderColor="teal.500"
            mb={4}
          >
            <option value="template-1">Template 1</option>
            <option value="template-2">Template 2</option>
            <option value="template-3">Template 3</option>
          </Select>
        </FormControl>

        <Button
          colorScheme="blue"
          size="lg"
          maxWidth="300px" // Setting max width to 300px
          borderRadius="md"
          onClick={handleSubmitBaseContractTemplate}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Financiers;
