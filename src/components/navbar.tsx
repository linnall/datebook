import { HStack, Text, VStack } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <VStack h="100vh" w="100vw">
      <HStack alignItems="center" color="white" bg="#7FD4BC" p="3" width="full" borderBottom="5px outset #7FD4BC">
        <HStack alignItems="baseline" gap={4}>
          <HStack alignItems="baseline" pr={7}>
            <Text as="span" fontSize="2xl">
              Datebook
            </Text>
          </HStack>
          <Link to={"/signed_in/timeline"}>Timeline</Link>
          <Link to={"/signed_in/create"}>Create</Link>
        </HStack>
      </HStack>
      <Outlet />
    </VStack>
  );
};

export default NavBar;
