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
import './Login.css'

const theme = createTheme()

export default function SignIn() {
  const [wrongCredentials, setWrongCredentials] = useState(null)
  const [verifyAccount, setVerifyAccount] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const requestBody = {
      username: data.get('username'),
      password: data.get('password'),
    }
    console.log(requestBody)
    axios
      .post('http://localhost:8080/api/v0/user/login', requestBody)
      .then((response) => {
        localStorage.setItem('userId', response.data)
        window.location.href = '/'
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setWrongCredentials(1)
        }
        if (error.response.status === 422) {
          setVerifyAccount(true)
        }
      })
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box className="sign-in-box">
            <Avatar className="sign-in-avatar">
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="sign-in-button"
              >
                Log in !
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgotPassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      {wrongCredentials && (
        <Alert severity="error">Wrong username or password! Try again!</Alert>
      )}
      {verifyAccount && (
        <Alert severity="warning">
          Your account is not verified! Click <a href="/verify">here</a> to
          verify it!
        </Alert>
      )}
    </div>
  )
}
