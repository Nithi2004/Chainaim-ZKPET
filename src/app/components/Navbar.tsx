// src/app/components/Navbar.tsx
"use client"; // Mark this file as a client component

import { Box, Flex, Button, Stack, useColorMode, IconButton } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { FaWallet } from 'react-icons/fa';
import { useState } from 'react';
import Link from 'next/link';

interface NavItemProps {
  href: string;
  label: string;
  index: number;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <Box>
      <Flex
        bgGradient="linear(to-r, orange.400, yellow.400)"
        color="white"
        minH="80px"
        py={{ base: 4 }}
        px={{ base: 6 }}
        align="center"
        justify="space-between"
      >
        {/* Left Side: Page Title */}
        <Flex align="center">
          <Link href="/" passHref>
            <Title label="CHAINAIM ZK-PRET : Supply Chain Finance" />
          </Link>
        </Flex>

        {/* Right Side: Navbar Links and Connect Wallet */}
        <Flex align="center">
          <Stack direction="row" spacing={8} alignItems="center">
            <NavItem href="/importers" label="Importers" index={0} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
            <NavItem href="/exporters" label="Exporters" index={1} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
            <NavItem href="/financiers" label="Financiers" index={2} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
            <IconButton
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              aria-label="Toggle dark mode"
              onClick={toggleColorMode}
              size="lg"
            />
            <Button
              leftIcon={<FaWallet />}
              bg="white"
              color="gray.700"
              variant="solid"
              size="lg"
              _hover={{ bg: "teal.500", color: "white" }}
              _active={{ bg: "teal.600" }}
            >
              Connect Wallet
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

const NavItem = ({ href, label, index, activeIndex, setActiveIndex }: NavItemProps) => {
  const isActive = activeIndex === index;

  return (
    <Link href={href} passHref>
      <Box
        position="relative"
        onMouseEnter={() => setActiveIndex(index)}
        onMouseLeave={() => setActiveIndex(null)}
        mx={4}
        fontSize="lg"
        fontWeight="normal"
        color="white"
        cursor="pointer"
      >
        {label}
        <Box
          position="absolute"
          left={0}
          right={0}
          bottom={-3}
          height="2px"
          backgroundColor="white"
          transform={isActive ? 'scaleX(1)' : 'scaleX(0)'}
          transition="transform 0.5s ease-in-out"
          transformOrigin="left"
        />
      </Box>
    </Link>
  );
};

// Title component
const Title = ({ label }: { label: string }) => {
  return (
    <Box
      fontSize="2xl"
      fontWeight="bold"
      color="white"
      cursor="pointer" // Change cursor to pointer for interactivity
    >
      {label}
    </Box>
  );
};

export default Navbar;
