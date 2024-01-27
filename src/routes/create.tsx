import {
  Box,
  BoxProps,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
  forwardRef,
} from "@chakra-ui/react";
import { useState } from "react";
import { client } from "../main";
import { Image } from "@chakra-ui/react";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";

const ImagePreview: React.FC<{ file: File }> = (props) => {
  const [imageURI, setImageURI] = useState<any>();
  if (!props.file) return null;

  let reader = new FileReader();
  reader.onload = (e) => {
    setImageURI(e.target.result);
  };
  reader.readAsDataURL(props.file);

  return (
    <WrapItem>
      <Image w="10em" h="10em" fit="cover" border="8px ridge #EFD69E" src={imageURI} />
    </WrapItem>
  );
};

function Create() {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [date, setDate] = useState(null);
  const [photos, setPhotos] = useState<FileList>(null);

  const photosArray = Array.from(photos ?? []);

  return (
    <Container maxW="xl">
      <VStack>
        <Wrap justify="center">
          {photosArray.map((file) => (
            <ImagePreview file={file} />
          ))}
          <WrapItem>
            <Box w="10em" h="10em" border="8px ridge #aaaaaa">
              <Box position="relative" height="100%" width="100%">
                <Box position="absolute" top="0" left="0" height="100%" width="100%" display="flex" flexDirection="column">
                  <Stack height="100%" width="100%" display="flex" alignItems="center" justify="center" spacing="4">
                    <Stack p="8" textAlign="center" spacing="1">
                      <Heading size="lg" color="#FB9600">
                        Drop images
                      </Heading>
                      <Text fontWeight="light">or click to upload</Text>
                    </Stack>
                  </Stack>
                </Box>
                <Input
                  type="file"
                  height="100%"
                  width="100%"
                  position="absolute"
                  top="0"
                  left="0"
                  opacity="0"
                  aria-hidden="true"
                  accept="image/*"
                  placeholder="Photos"
                  size="md"
                  multiple
                  onChange={(e) => setPhotos(e.target.files ?? undefined)}
                />
              </Box>
            </Box>
          </WrapItem>
        </Wrap>
        <FormControl isInvalid={title === ""}>
          <FormLabel>Title</FormLabel>
          <Input size="md" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <FormErrorMessage>Title is required.</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={description === ""}>
          <FormLabel>Description</FormLabel>
          <Input
            placeholder="What did you do?"
            size="md"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormErrorMessage>Description is required.</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={date === undefined}>
          <FormLabel>Date</FormLabel>
          <Input size="md" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <FormErrorMessage>Date is required.</FormErrorMessage>
        </FormControl>
        <Button
          onClick={async () => {
            if (!title) {
              setTitle("");
              return;
            }

            if (!description) {
              setDescription("");
              return;
            }

            if (!date) {
              setDate(undefined);
              return;
            }

            let fileIds = [];

            if (photos) {
              for (let i = 0; i < photos.length; i++) {
                const file = photos.item(i);
                if (!file) continue;
                await client.file
                  .uploadFile({ file: { name: file.name, data: await file.arrayBuffer() } })
                  .then((res) => fileIds.push(res.fileKey));
              }
            }

            client.record
              .addRecord({
                app: 2,
                record: {
                  title_folder_name: { value: title },
                  date_date: { value: date },
                  description: { value: description },
                  picture: {
                    value: fileIds.map((fileId) => ({
                      fileKey: fileId,
                    })),
                  },
                },
              })
              .then((res) => console.log(res));
          }}
        >
          Create
        </Button>
      </VStack>
    </Container>
  );
}

export default Create;
