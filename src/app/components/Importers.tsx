import {
  Box,
  Button,
  Text,
  Input,
  Icon,
  Divider,
  Grid,
  FormControl,
  FormLabel,
  GridItem,
  Textarea,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { CheckIcon } from '@chakra-ui/icons';

const Importers = () => {
  const [files, setFiles] = useState<{ [key: string]: { name: string; uploaded: boolean } }>({
    purchaseOrder: { name: '', uploaded: false },
    registration: { name: '', uploaded: false },
    exportImportCredentials: { name: '', uploaded: false },
  });

  const [importerName, setImporterName] = useState('');
  const [exporterName, setExporterName] = useState('');
  const [purchaseOrderHistory, setPurchaseOrderHistory] = useState<any[]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem('purchaseOrderHistory');
    if (storedHistory) {
      setPurchaseOrderHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    if (purchaseOrderHistory.length > 0) {
      localStorage.setItem('purchaseOrderHistory', JSON.stringify(purchaseOrderHistory));
    }
  }, [purchaseOrderHistory]);

  const handleFileChange = (type: string, file: File | null) => {
    if (file) {
      setFiles((prev) => ({
        ...prev,
        [type]: { name: file.name, uploaded: true },
      }));

      if (type === 'purchaseOrder') {
        const newEntry = {
          sNo: purchaseOrderHistory.length + 1,
          importerName,
          purchaseOrder: file.name,
          exporterName,
          status: 'Uploaded',
        };
        setPurchaseOrderHistory((prev) => [...prev, newEntry]);
      }
    }
  };

  const handleUploadClick = (type: string) => {
    const inputElement = document.getElementById(`${type}-input`) as HTMLInputElement;
    inputElement.click();
  };

  const handleFetchClick = (type: string) => {
    alert(`Fetching ${type}...`);
  };

  const handleGenerateProofs = () => {
    if (importerName && files.purchaseOrder.uploaded) {
      alert('Data integrity proofs generated!');
    } else {
      alert('Please enter the importer name and upload a purchase order.');
    }
  };

  const handleClearHistory = () => {
    setPurchaseOrderHistory([]);
    localStorage.removeItem('purchaseOrderHistory');
  };

  return (
    <Box p={6}>
      <Box mb={8}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>Importer Details</Text>

        <Grid templateColumns="1fr 1fr" gap={8}>
          <GridItem>
            <FormControl mb={4}>
              <FormLabel>Importer Name</FormLabel>
              <Input
                placeholder="Enter Importer Name"
                maxWidth="300px"
                value={importerName}
                onChange={(e) => setImporterName(e.target.value)}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Importer Address</FormLabel>
              <Textarea placeholder="Enter Importer Address" maxWidth="500px" height="150px" />
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl mb={4}>
              <FormLabel>Registration</FormLabel>
              <Input
                id="registration-input"
                type="file"
                accept=".pdf,.doc,.docx,.json"
                onChange={(e) => handleFileChange('registration', e.target.files?.[0] || null)}
                style={{ display: 'none' }}
              />
              <Button colorScheme="blue" mr={4} onClick={() => handleUploadClick('registration')}>
                Upload
              </Button>
              <Button colorScheme="green" mr={4} onClick={() => handleFetchClick('registration')}>
                Fetch
              </Button>
              {files.registration.uploaded && (
                <Text color="green.500" display="flex" alignItems="center">
                  <Icon as={CheckIcon} color="green.500" mr={2} /> {files.registration.name}
                </Text>
              )}
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Export/Import Credentials</FormLabel>
              <Input
                id="exportImportCredentials-input"
                type="file"
                accept=".pdf,.doc,.docx,.json"
                onChange={(e) => handleFileChange('exportImportCredentials', e.target.files?.[0] || null)}
                style={{ display: 'none' }}
              />
              <Button colorScheme="blue" mr={4} onClick={() => handleUploadClick('exportImportCredentials')}>
                Upload
              </Button>
              <Button colorScheme="green" mr={4} onClick={() => handleFetchClick('exportImportCredentials')}>
                Fetch
              </Button>
              {files.exportImportCredentials.uploaded && (
                <Text color="green.500" display="flex" alignItems="center">
                  <Icon as={CheckIcon} color="green.500" mr={2} /> {files.exportImportCredentials.name}
                </Text>
              )}
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Legal Entity Identity (LEI)</FormLabel>
              <Input placeholder="Enter LEI" maxWidth="300px" />
            </FormControl>
          </GridItem>
        </Grid>
      </Box>

      <Divider borderColor={'black'} mb={8} />

      <Text fontSize="lg" mb={6}>
        Upload your process information (supply chain finance documents and data).
      </Text>

      <FormControl mb={4} mt={6}>
        <FormLabel>Choose Exporter</FormLabel>
        <Select
          placeholder="Select Exporter"
          value={exporterName}
          onChange={(e) => setExporterName(e.target.value)}
        >
          <option value="exporter1">Exporter 1</option>
          <option value="exporter2">Exporter 2</option>
          <option value="exporter3">Exporter 3</option>
          <option value="exporter4">Exporter 4</option>
          <option value="exporter5">Exporter 5</option>
        </Select>
      </FormControl>

      <Grid templateColumns="1fr auto 1fr" gap={6} mb={6}>
        <Box>
          <Text fontWeight="bold" mb={2}>Purchase Order:</Text>
          <Input
            id="purchaseOrder-input"
            type="file"
            accept=".json"
            onChange={(e) => handleFileChange('purchaseOrder', e.target.files?.[0] || null)}
            style={{ display: 'none' }}
          />
          <Button colorScheme="blue" mr={4} onClick={() => handleUploadClick('purchaseOrder')}>
            Upload
          </Button>
          <Button colorScheme="green" mr={4} onClick={() => handleFetchClick('purchaseOrder')}>
            Fetch
          </Button>
          {files.purchaseOrder.uploaded && (
            <Text color="green.500" display="flex" alignItems="center">
              <Icon as={CheckIcon} color="green.500" mr={2} /> {files.purchaseOrder.name}
            </Text>
          )}
        </Box>
      </Grid>

      <Button colorScheme="teal" size="lg" mt={4} onClick={handleGenerateProofs}>
        Generate Data Integrity Proofs
      </Button>

      <Divider borderColor={'black'} my={8} />

      <Text fontSize="2xl" fontWeight="bold" mb={4}>Purchase Order History</Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>S.No</Th>
            <Th>Importer Name</Th>
            <Th>Purchase Order</Th>
            <Th>Exporter Name</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {purchaseOrderHistory.map((item) => (
            <Tr key={item.sNo}>
              <Td>{item.sNo}</Td>
              <Td>{item.importerName}</Td>
              <Td>{item.purchaseOrder}</Td>
              <Td>{item.exporterName}</Td>
              <Td>{item.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Button colorScheme="red" size="md" mt={6} onClick={handleClearHistory}>
        Clear History
      </Button>
    </Box>
  );
};

export default Importers;
