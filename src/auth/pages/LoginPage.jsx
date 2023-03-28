import { Link as RouterLink } from 'react-router-dom'
import { Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux'

import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { checkingAuthentication, startGoogleSignIn } from '../../store/auth'
import { useMemo } from 'react'

export const LoginPage = () => {

    const { status } = useSelector( state => state.auth )

    const dispatch = useDispatch();

    const { email, password, onInputChange} = useForm({
        email: 'jang@react.com',
        password: '1234',
    })

    const isAuthenticating = useMemo( () => status === 'checking', [status])

    const handleSubmit = ( event ) => {

        event.preventDefault();
        dispatch (checkingAuthentication( email, password ));


    }

    const handleGoogleSignIn = ( event ) => {

        dispatch ( startGoogleSignIn() );

    }

    return (
        <AuthLayout title = 'Login'>
            <form onSubmit={ handleSubmit }>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField 
                            table="Email" 
                            type="email" 
                            placeholder="email@email.com"
                            fullWidth
                            name="email"
                            value = { email }
                            onChange={ onInputChange }
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
                            onChange={ onInputChange }
                        />
                    </Grid>
                    <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }} >
                        <Grid item xs={12} sm={6}>
                            <Button
                                variant='contained' 
                                fullWidth
                                type="submit"
                                disabled = { isAuthenticating }
                            >
                                Login
                            </Button>
                        
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                variant='contained' 
                                fullWidth
                                onClick={ handleGoogleSignIn }
                                disabled = { isAuthenticating }
                            >
                                <Google /><Typography sx={{ ml: 1}}>Google</Typography>                                    
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid 
                        container 
                        direction='row'
                        justifyContent='end'
                    >
                        <Link component={ RouterLink } color='inherit' to="/auth/register">
                            Create an account
                        </Link>                            
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
