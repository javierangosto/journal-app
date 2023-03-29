import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        activeNote: null,
    },
    reducers: {
        savingNewNote: ( state ) => {

            state.isSaving = true;

        },
        addNewEmptyNote: ( state, action ) => {

            state.notes.push( action.payload );
            state.isSaving = false;

        },
        setActiveNote: ( state, action ) => {
            
            state.activeNote = action.payload;
            state.messageSaved = '';

        },
        setNotes: ( state, action ) => {

            state.notes = action.payload;

        },
        setSaving: ( state ) => {
            state.isSaving = true;
            state.messageSaved = '';

        },
        noteUpdated: ( state, action ) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => {
                
                if ( note.id === action.payload.id ){
                    return action.payload;
                }

                return note;

            })

            state.messageSaved = `Note "${ action.payload.title }" updated successfully`;

        },
        setPhotosToActiveNote: ( state, action) => {
            state.activeNote.imageURL = [ ...state.activeNote.imageURL, ...action.payload ];
            state.isSaving = false;
        },
        clearNotesLogout: ( state ) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.activeNote = null;
        },
        deleteNoteById: ( state, action ) => {
            state.activeNote = null;
            state.notes = state.notes.filter( note => note.id !== action.payload );
        }
    }
});

export const {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    noteUpdated,
    setPhotosToActiveNote,
    clearNotesLogout,
    deleteNoteById,
} = journalSlice.actions;