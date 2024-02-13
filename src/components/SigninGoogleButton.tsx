import {signInWithGoogle} from "../services/firebase.service";

const GoogleSignInButton = () => {
  const googleSignIn = async () => {
    await signInWithGoogle();
  };
  return <button onClick={googleSignIn}>Login</button>;
};

export default GoogleSignInButton;
