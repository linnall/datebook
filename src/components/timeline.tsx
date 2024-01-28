import { Box, chakra, Container, Text, HStack, VStack, Flex, useColorModeValue, useBreakpointValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Milestones = (props) => {
  const milestones = props.milestones
    ?.map((record: any) => ({
      id: record.$id.value,
      date: record.date_date.value,
      title: record.title_folder_name.value,
      description: record.description.value,
    }))
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const isDesktop = useBreakpointValue({ base: false, md: true });

  if (!milestones) return null;
  if (milestones.length == 0) return <Text pt="10%">Nothing here yet :(</Text>;

  return (
    <Container maxWidth="7xl" p={{ base: 2, sm: 10 }}>
      {milestones.map((milestone, idx) => (
        <Flex key={milestone.id} mb="10px">
          {/* Desktop view(left card) */}
          {isDesktop && idx % 2 === 0 && (
            <>
              <EmptyCard />
              <LineWithDot />
              <Card {...milestone} isLeft />
            </>
          )}

          {/* Desktop view(right card) */}
          {isDesktop && idx % 2 !== 0 && (
            <>
              <Card {...milestone} isLeft={false} />
              <LineWithDot />
              <EmptyCard />
            </>
          )}
        </Flex>
      ))}
    </Container>
  );
};

interface CardProps {
  id: number;
  title: string;
  description: string;
  date: string;
  isLeft: boolean;
}

const Card = ({ id, title, description, date, isLeft }: CardProps) => {
  // For even id show card on left side
  // For odd id show card on right side
  let borderWidthValue = isLeft ? "15px 15px 15px 0" : "15px 0 15px 15px";
  let leftValue = isLeft ? "-15px" : "unset";
  let rightValue = isLeft ? "unset" : "-15px";

  const navigate = useNavigate();

  return (
    <HStack
      onClick={() => {
        navigate(`/signed_in/record/${id}`);
      }}
      flex={1}
      p={{ base: 3, sm: 6 }}
      bg={useColorModeValue("gray.100", "gray.800")}
      spacing={5}
      alignItems="center"
      pos="relative"
      _hover={{ bg: "gray.300" }}
      _before={{
        content: `""`,
        w: "0",
        h: "0",
        borderColor: `transparent ${useColorModeValue("#edf2f6", "#1a202c")} transparent`,
        borderStyle: "solid",
        borderWidth: borderWidthValue,
        position: "absolute",
        left: leftValue,
        right: rightValue,
        display: "block",
      }}
    >
      <Box>
        <Text fontSize="lg" color={isLeft ? "teal.400" : "blue.400"}>
          {date}
        </Text>

        <VStack spacing={2} mb={3} alignItems="start">
          <chakra.h1 fontSize="2xl" lineHeight={1.2} fontWeight="bold">
            {title}
          </chakra.h1>
          <Text fontSize="md">{description}</Text>
        </VStack>
      </Box>
    </HStack>
  );
};

const LineWithDot = () => {
  return (
    <Flex pos="relative" alignItems="center" mr={{ base: "40px", md: "40px" }} ml={{ base: "0", md: "40px" }}>
      <chakra.span
        position="absolute"
        left="50%"
        height="calc(100% + 10px)"
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        top="0px"
      ></chakra.span>
      <Box pos="relative" p="10px">
        <Box
          pos="absolute"
          top="0"
          left="0"
          bottom="0"
          right="0"
          height="100%"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          backgroundPosition="center center"
          bg={useColorModeValue("gray.600", "gray.200")}
          borderRadius="100px"
          backgroundImage="none"
          opacity={1}
        ></Box>
      </Box>
    </Flex>
  );
};

const EmptyCard = () => {
  return <Box flex={{ base: 0, md: 1 }} p={{ base: 0, md: 6 }} bg="transparent"></Box>;
};
