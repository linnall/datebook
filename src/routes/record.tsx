import { Text, Image, Heading, VStack, Divider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../main";

function Record() {
  let { id } = useParams();
  const [data, setData] = useState<any>();

  useEffect(() => {
    client.record.getRecord({ app: 2, id }).then((res) => setData(res));
  }, []);

  if (!data) return <Text>Loading...</Text>;

  const pictures = data.record?.picture?.value;

  return (
    <VStack align="start" pt="20">
      <Heading size="lg">{data.record.title_folder_name.value}</Heading>
      <Text>{data.record.date_date.value}</Text>
      <Divider borderBottomWidth="2px" borderColor="#006175" />
      <Text>{data.record.description.value}</Text>
      {pictures &&
        pictures.map((picture: any) => {
          const imageURI = `https://uofthacks.qhyun.org/proxy/k/v1/file.json?fileKey=${picture.fileKey}`;
          return <Image maxW="15em" fit="cover" border="8px ridge #EFD69E" src={imageURI} />;
        })}
    </VStack>
  );
}

export default Record;
