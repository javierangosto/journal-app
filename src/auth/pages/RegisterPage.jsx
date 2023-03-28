import { Link as RouterLink } from 'react-router-dom'
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'

const formData = {
    displayName: 'Javier Angosto',
    email: 'jang@react.com',
    password: '1234',
}

const formValidations = {
    displayName: [( value ) => value.length >= 1, 'The name is required'],
    email: [( value ) => value.includes('@'), 'The email address is invalid'],
    password: [( value ) => value.length >= 6, 'The password must have more than six characters'],
    
}

export const RegisterPage = () => {

    const { 
        formState, displayName, email, password, onInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid
    } = useForm( formData, formValidations );

    const handleSubmit = ( event ) => {
        event.preventDefault();
        console.log(formState)
    }

    return (
        <AuthLayout title = 'Register'>
            <form onSubmit={ handleSubmit }>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField 
                            table="Name" 
                            type="name" 
                            placeholder="Your name"
                            fullWidth
                            name="displayName"
                            value={ displayName }
                            onChange = { onInputChange }
                            error={ !displayNameValid }
                            helperText={ displayNameValid }
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField 
                            table="Email" 
                            type="email" 
                            placeholder="email@email.com"
                            fullWidth
                            name="email"
                            value={ email }
                            onChange = { onInputChange }
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField 
                            table="Password" 
                            type="password" 
                            placeholder="Password"
                            fullWidth
                            name="password"
                            value={ password }
                            onChange = { onInputChange }
                        />
                    </Grid>
                    <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }} >
                        <Grid item xs={12}>
                            <Button
                                variant='contained' 
                                fullWidth
                                type="submit"
                            >
                                Create an account
                            </Button>
                        
                        </Grid>
                    </Grid>

                    <Grid 
                        container 
                        direction='row'
                        justifyContent='end'
                    >
                        <Typography sx={{mr: 1}}>Already have an account?</Typography>
                        <Link component={ RouterLink } color='inherit' to="/auth/login">
                            Login
                        </Link>                            
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
