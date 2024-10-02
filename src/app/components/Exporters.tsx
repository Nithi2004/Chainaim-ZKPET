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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { CheckIcon } from '@chakra-ui/icons';

const Exporters = () => {
  const [purchaseOrderHistory, setPurchaseOrderHistory] = useState<any[]>([]);
  const [files, setFiles] = useState<{ [key: string]: { name: string; uploaded: boolean } }>({
    registration: { name: '', uploaded: false },
    exportImportCredentials: { name: '', uploaded: false },
    invoice: { name: '', uploaded: false },
    billOfLading: { name: '', uploaded: false },
    kycAmlSanctions: { name: '', uploaded: false },
  });
  const [exporterName, setExporterName] = useState('');
  const [showDashboard, setShowDashboard] = useState(false); // Control to show/hide dashboard

  useEffect(() => {
    const storedHistory = localStorage.getItem('purchaseOrderHistory');
    if (storedHistory) {
      setPurchaseOrderHistory(JSON.parse(storedHistory));
    }
  }, []);

  const handleFileChange = (type: string, file: File | null) => {
    if (file) {
      setFiles((prev) => ({
        ...prev,
        [type]: { name: file.name, uploaded: true },
      }));
    }
  };

  const handleUploadClick = (type: string) => {
    const inputElement = document.getElementById(`${type}-input`) as HTMLInputElement;
    inputElement.click();
  };

  const updateStatus = (sNo: number, status: string) => {
    const updatedHistory = purchaseOrderHistory.map((order) => {
      if (order.sNo === sNo) {
        return { ...order, status };
      }
      return order;
    });

    setPurchaseOrderHistory(updatedHistory);
    localStorage.setItem('purchaseOrderHistory', JSON.stringify(updatedHistory));
  };

  const handleGenerateProofs = () => {
    if (files.invoice.uploaded && files.billOfLading.uploaded) {
      alert('Data integrity proofs generated for Invoice and Bill of Lading!');
    } else {
      alert('Please upload both Invoice and Bill of Lading documents.');
    }
  };

  const handleGenerateIdentityProof = () => {
    if (files.kycAmlSanctions.uploaded) {
      alert('Identity Proof Generated!');
    } else {
      alert('Please upload KYC/AML Sanctions document.');
    }
  };

  const handleGenerateComplianceProof = () => {
    alert('Compliance Proof Generated!');
  };
  const approvedOrders = purchaseOrderHistory.filter(order => order.status === 'Approved');

  return (
    <Box p={6}>
      {/* Exporter Details Section */}
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Exporter Details</Text>

      <Grid templateColumns="1fr 1fr" gap={8} mb={8}>
        <GridItem>
          <FormControl mb={4}>
            <FormLabel>Exporter Name</FormLabel>
            <Input
              placeholder="Enter Exporter Name"
              maxWidth="300px"
              value={exporterName}
              onChange={(e) => setExporterName(e.target.value)}
            />
          </FormControl>

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
            <Button colorScheme="green" mr={4}>
              Fetch 
            </Button>
            {files.registration.uploaded && (
              <Text color="green.500" display="flex" alignItems="center">
                <Icon as={CheckIcon} color="green.500" mr={2} /> {files.registration.name}
              </Text>
            )}
          </FormControl>
        </GridItem>

        <GridItem>
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
            <Button colorScheme="green" mr={4}>
              Fetch 
            </Button>
            {files.exportImportCredentials.uploaded && (
              <Text color="green.500" display="flex" alignItems="center">
                <Icon as={CheckIcon} color="green.500" mr={2} /> {files.exportImportCredentials.name}
              </Text>
            )}
          </FormControl>
        </GridItem>
      </Grid>

      {/* Divider */}
      <Divider borderColor={'black'} mb={8} />

      {/* View Purchase Order Button */}
      <Button colorScheme="teal" size="lg" mb={6} onClick={() => setShowDashboard(!showDashboard)}>
        View Purchase Order
      </Button>

      {/* Exporter Dashboard (conditionally displayed) */}
      {showDashboard && (
        <Box>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>Exporter Dashboard</Text>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>S.No</Th>
                <Th>Importer Name</Th>
                <Th>Purchase Order</Th>
                <Th>Exporter Name</Th>
                <Th>Status</Th>
                <Th>Update Status</Th>
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
                  <Td>
                    <Button
                      colorScheme="green"
                      size="sm"
                      mr={2}
                      onClick={() => updateStatus(item.sNo, 'Approved')}
                    >
                      Approve
                    </Button>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => updateStatus(item.sNo, 'Denied')}
                    >
                      Deny
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}

      {/* Divider */}
      <Divider borderColor={'black'} my={8} />

      <Grid templateColumns="repeat(2, 1fr)" gap={8}>
        {/* Invoice Upload and Fetch */}
        <GridItem>
          <FormControl mb={4}>
            <FormLabel>Invoice</FormLabel>
            <Input
              id="invoice-input"
              type="file"
              accept=".pdf,.doc,.docx,.json"
              onChange={(e) => handleFileChange('invoice', e.target.files?.[0] || null)}
              style={{ display: 'none' }}
            />
            <Button colorScheme="blue" mr={4} onClick={() => handleUploadClick('invoice')}>
              Upload Invoice
            </Button>
            <Button colorScheme="green" mr={4}>
              Fetch Invoice
            </Button>
            {files.invoice.uploaded && (
              <Text color="green.500" display="flex" alignItems="center">
                <Icon as={CheckIcon} color="green.500" mr={2} /> {files.invoice.name}
              </Text>
            )}
          </FormControl>

          {/* Bill of Lading Upload and Fetch */}
          <FormControl mb={4}>
            <FormLabel>Bill of Lading</FormLabel>
            <Input
              id="billOfLading-input"
              type="file"
              accept=".pdf,.doc,.docx,.json"
              onChange={(e) => handleFileChange('billOfLading', e.target.files?.[0] || null)}
              style={{ display: 'none' }}
            />
            <Button colorScheme="blue" mr={4} onClick={() => handleUploadClick('billOfLading')}>
              Upload Bill of Lading
            </Button>
            <Button colorScheme="green" mr={4}>
              Fetch Bill of Lading
            </Button>
            {files.billOfLading.uploaded && (
              <Text color="green.500" display="flex" alignItems="center">
                <Icon as={CheckIcon} color="green.500" mr={2} /> {files.billOfLading.name}
              </Text>
            )}
          </FormControl>
        </GridItem>

        {/* KYC/AML Upload and Fetch */}
        <GridItem>
          <FormControl mb={4}>
            <FormLabel>KYC/AML Sanctions</FormLabel>
            <Input
              id="kycAmlSanctions-input"
              type="file"
              accept=".pdf,.doc,.docx,.json"
              onChange={(e) => handleFileChange('kycAmlSanctions', e.target.files?.[0] || null)}
              style={{ display: 'none' }}
            />
            <Button colorScheme="blue" mr={4} onClick={() => handleUploadClick('kycAmlSanctions')}>
              Upload KYC/AML
            </Button>
            <Button colorScheme="green" mr={4}>
              Fetch KYC/AML
            </Button>
            {files.kycAmlSanctions.uploaded && (
              <Text color="green.500" display="flex" alignItems="center">
                <Icon as={CheckIcon} color="green.500" mr={2} /> {files.kycAmlSanctions.name}
              </Text>
            )}
          </FormControl>
        </GridItem>
      </Grid>

      <Grid templateColumns="repeat(2, 1fr)" gap={8}>
        {/* Left Side: Generate Data Integrity Proofs */}
        <Box>
          <Button colorScheme="teal" size="lg" mt={4} onClick={handleGenerateProofs}>
            Generate Data Integrity Proofs
          </Button>
        </Box>

        {/* Right Side: Generate Identity and Compliance Proof */}
        <Box>
          <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={4}>
            <Button colorScheme="teal" size="lg" onClick={handleGenerateIdentityProof}>
              Generate Identity Proof
            </Button>
            <Button colorScheme="teal" size="lg" onClick={handleGenerateComplianceProof}>
              Generate Compliance Proof
            </Button>
          </Grid>
        </Box>
      </Grid>
        {/* Divider */}
        <Divider borderColor={'black'} my={8} />
        

{/* Approved Purchase Orders Section */}
<Text fontSize="2xl" fontWeight="bold" mb={4}>Approved Purchase Orders</Text>
{approvedOrders.length > 0 ? (
  <Table variant="simple">
    <Thead>
      <Tr>
        <Th>S.No</Th>
        <Th>Importer Name</Th>
        <Th>Purchase Order</Th>
        <Th>Exporter Name</Th>
      </Tr>
    </Thead>
    <Tbody>
      {approvedOrders.map((item) => (
        <Tr key={item.sNo}>
          <Td>{item.sNo}</Td>
          <Td>{item.importerName}</Td>
          <Td>{item.purchaseOrder}</Td>
          <Td>{item.exporterName}</Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
) : (
  <Text>No Approved Purchase Orders</Text>
)}
      
      
    </Box>
  );
};

export default Exporters;
