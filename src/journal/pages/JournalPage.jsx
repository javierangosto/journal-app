import { AddOutlined } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal/thunks"
import { JournalLayout } from "../layout"
import { NoteView, NothingSelectedView } from "../views"

export const JournalPage = () => {

    const dispatch = useDispatch();

    const { isSaving, activeNote } = useSelector ( state => state.journal );

    const handleNewNote = () => {
        
        dispatch( startNewNote() );

    }

    return (
        
        <JournalLayout>
            {
                ( !!activeNote )
                ? <NoteView/>
                : <NothingSelectedView />
            }         

            <IconButton
                size='large'
                disabled={ isSaving }
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main', opacity: 0.9},
                    position: 'fixed',
                    right: 50,
                    bottom: 50,
                }}
                onClick={handleNewNote}
            >
                <AddOutlined sx={{ fontSize: 30 }} />
            </IconButton>
        </JournalLayout>

    )
}
