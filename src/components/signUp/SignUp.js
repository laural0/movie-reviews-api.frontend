import * as React from 'react'
import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from 'axios'
import Alert from '@mui/material/Alert'
import './signUp.css'

const theme = createTheme()

export default function SignUp() {
  const [existingUsername, setExistingUsername] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const requestBody = {
      username: data.get('username'),
      password: data.get('password'),
      emailAddress: data.get('emailAddress'),
    }
    console.log(requestBody)
    axios
      .post('http://localhost:3000/signup', requestBody)
      .then((response) => {
        setTimeout(() => {
          window.location.href = '/verify'
        }, 5000)
        console.log('signup successful!')
        setExistingUsername(0)
      })
      .catch((error) => {
        console.log(error)
        setExistingUsername(1)
      })
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className="sign-up-box">
          <Avatar className="sign-up-avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="emailAddress"
                  label="Email"
                  type="email"
                  id="emailAddress"
                  autoComplete="email"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="sign-up-button"
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      {existingUsername === 1 && (
        <Alert severity="error">
          Wrong username and password! Make sure that the username you want to
          pick and also your email address don't already exist in our database!
        </Alert>
      )}
      {existingUsername === 0 && (
        <Alert severity="success">
          Account created successfully! You received an email with an activation
          code. You will soon be redirected to the activation page.
          <p>
            <Link href="/verify" variant="body2">
              Click here to go to the activation page!
            </Link>
          </p>
        </Alert>
      )}
    </ThemeProvider>
  )
}
