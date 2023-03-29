import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { ImageGallery } from "../components"
import { useForm } from '../../hooks/'
import { useEffect, useMemo, useRef } from "react"
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css';


export const NoteView = () => {

    const { activeNote, messageSaved, isSaving } = useSelector( state => state.journal );
    const { title, body, date, onInputChange, formState } = useForm( activeNote );
    const dispatch = useDispatch();

    const dateString = useMemo( () => {
        
        return new Date( date ).toUTCString();       

    }, [ date ])

    const fileInputRef = useRef();

    const handleDelete = () => {

        dispatch ( startDeletingNote() );

    }

    useEffect(() => {
        
        dispatch( setActiveNote( formState ) );

    }, [formState])

    useEffect(() => {

        if ( messageSaved != '' ) {

            Swal.fire( 'Updated note', messageSaved, 'success');
        }

    }, [ messageSaved ])

    const handleSaveNote = () => {

        dispatch( startSaveNote() );

    }

    const handleFileInputChange = ({ target }) => {

        if( target.files === 0 ) return;
        
        dispatch( startUploadingFiles( target.files ) );
    }
    

    return (
    
        <Grid         
            className="animate__animated animate__fadeIn animate__faster"
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{ mb: 1 }}
        >
            <Grid item>
                <Typography
                    fontSize={39}
                    fontWeight='light'
                >
                    { dateString }
                </Typography>
            </Grid>
            <Grid item>

                <input 
                    type="file"
                    multiple
                    onChange={handleFileInputChange}
                    style = {{display:'none'}}
                    ref={ fileInputRef }
                />
                <IconButton
                    color="primary"
                    disabled={ isSaving }
                    onClick={ () => fileInputRef.current.click() }
                >
                    <UploadOutlined />
                </IconButton>

                <Button 
                    color='primary'
                    sx={{padding: 2}}
                    onClick={handleSaveNote}
                    disabled={ isSaving }
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Save
                </Button>
            </Grid>
            <Grid container>
                <TextField 
                    type = 'text'
                    variant = 'filled'
                    fullWidth
                    multiline
                    label='Title'
                    placeholder='Enter a title...'
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={ title }
                    onChange={onInputChange}
                />
            </Grid>
            <Grid container>
                <TextField 
                    type = 'text'
                    variant = 'filled'
                    fullWidth
                    multiline
                    placeholder='What has happened today?'
                    minRows={ 5 }
                    name="body"
                    value={ body }
                    onChange={onInputChange}
                />
            </Grid>

            <Grid container justifyContent="end">
                <Button
                    onClick={handleDelete}
                    sx={{mt: 2}}
                    color="error"
                >
                    <DeleteOutline />
                    Delete
                </Button>
            </Grid>
            
            <ImageGallery images = { activeNote.imageURL } />

        </Grid>

    )
}
