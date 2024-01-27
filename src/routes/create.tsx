import { Button, Input, VStack } from "@chakra-ui/react";

function Create() {
  return (
    <VStack>
      <Input placeholder="Title" size="md" type="text" />
      <Input placeholder="What did you do?" size="md" type="text" />
      <Input placeholder="Date" size="md" type="date" />
      <Input placeholder="Photos" size="md" type="file" multiple />
      <Button>Create</Button>
    </VStack>
  );
}

export default Create;
