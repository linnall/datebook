import { HStack, Text, VStack } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <VStack h="100vh" w="100vw">
      <HStack alignItems="center" color="white" bg="#000000" p="3" width="full">
        <HStack alignItems="baseline" gap={4}>
          <HStack alignItems="baseline" pr={7}>
            <Text as="span" fontSize="2xl">
              Datebook
            </Text>
          </HStack>
          <Link to={"/timeline"}>Timeline</Link>
          <Link to={"/add"}>Add</Link>
        </HStack>
      </HStack>
      <Outlet />
    </VStack>
  );
};

export default NavBar;
