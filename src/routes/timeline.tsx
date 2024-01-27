import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { client } from "../main";
import { Milestones } from "../components/timeline";
import { MilestonesProps } from "../components/timeline";

function Timeline() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    client.record.getAllRecords({ app: 2 }).then((res) => setData(res));
  }, []);

  console.log(data);

  const milestones = data?.map((record: any) => ({
    id: record.$id.value,
    date: "July 30, 2021",
    title: record.title_folder_name.value,
    description: "placeholder",
  })) as MilestonesProps[];

  return (
    <>
      <Milestones milestones={milestones} />
    </>
  );
}

export default Timeline;
