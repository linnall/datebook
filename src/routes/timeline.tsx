import { useEffect, useState } from "react";
import { client } from "../main";
import { Milestones } from "../components/timeline";

function Timeline() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    client.record.getAllRecords({ app: 2 }).then((res) => setData(res));
  }, []);

  const milestones = data?.map((record: any) => ({
    id: record.$id.value,
    date: record.date_date.value,
    title: record.title_folder_name.value,
    description: record.description.value,
  }));

  return <Milestones milestones={milestones} />;
}

export default Timeline;
