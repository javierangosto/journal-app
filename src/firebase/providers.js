import { Google } from "@mui/icons-material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {

        const result = await signInWithPopup( FirebaseAuth, googleProvider );
        //const credentials = GoogleAuthProvider.credentialFromResult( result );
        const user = result.user;
        
        return {
            ok: true,
            //user info
            displayName: user.displayName, 
            email: user.email, 
            photoURL: user.photoURL,
            uid: user.uid
        }
        
    } catch (error) {


        return {
            ok: false,
            errorMessage: error.message,
            errorCode: error.code,

        }
        
    }
}