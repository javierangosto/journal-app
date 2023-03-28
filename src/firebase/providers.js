import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
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

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {

    try {

        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password )
        const { uid, photoURL } = resp.user;

        await updateProfile( FirebaseAuth.currentUser, {
            displayName
        });
        
        return {
            ok: true,
            uid, photoURL, email, displayName
        }
        
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }

}

export const signInWithEmailPassword = async ({ email, password }) => {

    try {

        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, displayName, photoURL } = resp.user;
        
        return {
            ok: true,
            uid, photoURL, email, displayName,
        }
        
    } catch (error) {

        return {
            ok: false,
            errorMessage: error.message
        }
        
    }
}

export const signOutFireBase = async() => {

    return await FirebaseAuth.signOut();

}