import { Text } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { client } from "../main";
import { Milestones } from "../components/timeline";
import { MilestonesProps } from "../components/timeline";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </button>
  );
};

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
      <LogoutButton />
      <Text>Timeline</Text>
      <Milestones milestones={milestones} />
    </>
  );
}

export default Timeline;
