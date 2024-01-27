import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text, // Add this import
} from "@chakra-ui/react";

import { CohereClient } from "cohere-ai";

function BasicUsage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cohere = new CohereClient({
    token: "8FEf9wztdU8R48hBBpvaU2iPG1Rrk8h1vxPraBks",
  });
  // generate caption with Cohere API
  (async () => {
    const prediction = await cohere.generate({
      prompt: "hello",
      maxTokens: 10,
    });

    console.log("Received prediction", prediction);
  })();

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text> Hello </Text> {/* Use the imported Text component */}
          </ModalBody>
          <Text> Hi, hello!!! </Text> {/* Use the imported Text component */}
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
