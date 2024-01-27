import { Text } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { client } from "../main";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button>;
};

function Timeline() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    client.record.getAllRecords({ app: 2 }).then((res) => setData(res));
  }, []);

  console.log(data);

  return (
    <>
      <LogoutButton />
      <Text>Timeline</Text>
      {data?.map((record: any) => (
        <Text>{record.title_folder_name.value}</Text>
      ))}
    </>
  );
}

export default Timeline;
