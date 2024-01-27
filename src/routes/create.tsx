import { Button, Input, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { client } from "../main";

function Create() {
  useEffect(() => {
    client.record.getAllRecords({ app: 2 }).then((res) => console.log(res));
  });

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
