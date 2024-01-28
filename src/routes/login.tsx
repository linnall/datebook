import { AbsoluteCenter, Button, Center, Container, SkeletonText, Text, VStack } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef, useState } from "react";
import { cohere } from "../main";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  const [quote, setQuote] = useState("");
  const generating = useRef(false);

  useEffect(() => {
    if (generating.current) return;
    generating.current = true;

    cohere
      .generate({
        prompt:
          "generate a single short inspirational and sentimental quote about scrapbooking. provide just the quote with punctuation. do not ask any follow up questions.",
        temperature: 4,
        maxTokens: 100,
      })
      .then((res) => {
        setQuote(res.generations[0].text.replace(/scrapbook/gi, "datebook"));
      });
  }, []);

  return (
    <Center w="full" h="100vh" bg="#EFD69E">
      <Container maxW="lg">
        <VStack gap={10}>
          <SkeletonText w="full" h="full" isLoaded={quote != ""} mt="4" noOfLines={5} spacing="4" skeletonHeight="2">
            <Text align="justify">{quote}</Text>
          </SkeletonText>
          <Button onClick={() => loginWithRedirect()}>Log In</Button>
        </VStack>
      </Container>
    </Center>
  );
};

export default Login;
