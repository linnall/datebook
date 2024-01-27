import { Button, Input, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { client } from "../main";

function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [photos, setPhotos] = useState<FileList>();

  return (
    <VStack>
      <Input placeholder="Title" size="md" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Input placeholder="What did you do?" size="md" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      <Input placeholder="Date" size="md" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <Input placeholder="Photos" size="md" type="file" multiple onChange={(e) => setPhotos(e.target.files ?? undefined)} />
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
  );
}

export default Create;
