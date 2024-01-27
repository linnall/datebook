import { useEffect, useState } from "react";
import { client } from "../main";
import { Milestones } from "../components/timeline";

function Timeline() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    client.record.getAllRecords({ app: 2 }).then((res) => setData(res));
  }, []);

  return <Milestones milestones={data} />;
}

export default Timeline;
