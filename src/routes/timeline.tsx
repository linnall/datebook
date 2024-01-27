import { Text } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

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
  return (
    <>
      <LogoutButton />
      <Text>Timeline</Text>
    </>
  );
}

export default Timeline;
