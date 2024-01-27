import { Box, BoxProps, Button, Heading, Input, Stack, Text, VStack, forwardRef } from "@chakra-ui/react";
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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [photos, setPhotos] = useState<FileList>();

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
                      <Heading fontSize="lg" color="gray.700" fontWeight="bold">
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
        <Input placeholder="Title" size="md" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input placeholder="What did you do?" size="md" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Input placeholder="Date" size="md" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <Button
          onClick={async () => {
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
                    value: [
                      {
                        fileKey: fileIds[0],
                      },
                    ],
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
