import {
  Text,
  Image,
  Heading,
  VStack,
  Divider,
  WrapItem,
  Wrap,
  HStack,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { client, cohere } from "../main";
import { BsEmojiFrown, BsEmojiSmile, BsEmojiNeutral } from "react-icons/bs";
import back_arrow from "./back_arrow.png";

const examples = [
  { text: "We had an enjoyable time", label: "positive" },
  { text: "It was a blast", label: "positive" },
  { text: "I liked the place that we went", label: "positive" },
  { text: "I wish we did not go", label: "negative" },
  { text: "I hated it", label: "negative" },
  { text: "Worst date ever", label: "negative" },
];

function Record() {
  let { id } = useParams();
  const [data, setData] = useState<any>();
  const [classify, setClassify] = useState<any>();

  useEffect(() => {
    client.record.getRecord({ app: 2, id }).then((res) => {
      setData(res);

      cohere
        .classify({
          examples,
          inputs: [res.record.description.value as any],
        })
        .then((prediction) => {
          setClassify(prediction.classifications[0].prediction);
        });
    });
  }, []);

  if (!data) return <Text>Loading...</Text>;

  const pictures = data.record?.picture?.value;

  return (
    <>
      <Box marginRight="auto">
        <Link to={"/signed_in/timeline"}>
          <Image src={back_arrow} />
        </Link>
      </Box>
      <VStack align="start" pt="20">
        <Heading size="lg">{data.record.title_folder_name.value}</Heading>
        <Text>{data.record.date_date.value}</Text>
        <Divider borderBottomWidth="2px" borderColor="#006175" />
        <HStack>
          {
            {
              negative: <BsEmojiFrown />,
              neutral: <BsEmojiNeutral />,
              positive: <BsEmojiSmile />,
            }[classify]
          }
          <Text>{data.record.description.value}</Text>
        </HStack>
        <Wrap justify="center">
          {pictures &&
            pictures.map((picture: any) => {
              const imageURI = `https://uofthacks.qhyun.org/proxy/k/v1/file.json?fileKey=${picture.fileKey}`;
              return (
                <WrapItem key={picture.fileKey}>
                  <Image
                    maxW="15em"
                    fit="cover"
                    border="8px ridge #EFD69E"
                    src={imageURI}
                  />
                </WrapItem>
              );
            })}
        </Wrap>
      </VStack>
    </>
  );
}

export default Record;
