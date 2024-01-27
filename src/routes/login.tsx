import { Button } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

function Login() {
  return LoginButton();
}

export default Login;
