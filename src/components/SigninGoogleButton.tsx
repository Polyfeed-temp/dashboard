import { signInWithGoogle } from "../services/firebase.service";

const GoogleSignInButton = () => {
    const googleSignIn = async () => {
        await signInWithGoogle();
}
    return (
        <button onClick={googleSignIn}>Sign in with Google</button>
    );
}

export default GoogleSignInButton;