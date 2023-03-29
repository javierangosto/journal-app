import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase";
import { fileUpload, loadNotes } from "../../helpers";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, noteUpdated, setPhotosToActiveNote, deleteNoteById } from "./journalSlice";


export const startNewNote = () => {

    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageURL: [],
        }      

        dispatch( savingNewNote( newNote ) );
        
        const newDoc = doc( collection( FirebaseDB, `/${ uid }/journal/notes` ) );
        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id;

        dispatch ( addNewEmptyNote( newNote ) );
        dispatch ( setActiveNote( newNote ) );

    }

}

export const startLoadingNotes = () => {

    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;
        if ( !uid ) throw new Error ('User ID not found');

        const notes = await loadNotes( uid );

        dispatch ( setNotes( notes ) );
        
    }

}

export const startSaveNote = () => {

    return async ( dispatch, getState ) => {

        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { activeNote } = getState().journal;

        const noteToFireStore = { ...activeNote };

        delete noteToFireStore.id;

        const docRef = doc( FirebaseDB, `/${ uid }/journal/notes/${ activeNote.id }` );
        await setDoc( docRef, noteToFireStore, { merge: true });

        dispatch( noteUpdated( activeNote ) );

    }
}

export const startUploadingFiles = ( files = [] ) => {

    return async( dispatch ) => {

        dispatch( setSaving() );

        const fileUploadPromises = [];

        for (const file of files) {

            fileUploadPromises.push( fileUpload( file ) );
            
        }

        const photosURL = await Promise.all( fileUploadPromises );

        dispatch ( setPhotosToActiveNote( photosURL ) );

    }

}

export const startDeletingNote = () => {
    return async( dispatch, getState) => {

        const { uid } = getState().auth;
        const { activeNote } = getState().journal;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ activeNote.id }`);
        await deleteDoc( docRef );

        dispatch( deleteNoteById(activeNote.id) );

    }
}