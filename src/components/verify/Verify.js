import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from 'axios'
import Alert from '@mui/material/Alert'
import './Verify.css'

const theme = createTheme()

export default function Verify() {
  const [verified, setVerified] = useState(null)

  const resendEmail = () => {
    window.location.href = '/resendCode'
    console.log('resend email')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const verificationCode = data.get('verificationCode')
    console.log(verificationCode)

    axios
      .get(`http://localhost:3000/verify/${verificationCode}`)
      .then((response) => {
        console.log('verify successful!')
        setVerified(1)
      })
      .catch((error) => {
        console.log(error)
        setVerified(0)
      })
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className="verify-box">
          <Avatar className="verify-avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Verify your e-mail!
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="verificationCode"
                  label="Verification Code"
                  name="verificationCode"
                  autoComplete="verificationCode"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="verify-button"
            >
              Verify
            </Button>
          </Box>
        </Box>
      </Container>
      {verified === 0 && (
        <Alert severity="error">
          Wrong verification code! Check again every digit. You can also click
          below to resend the verification code.
          <Button className="btn" onClick={resendEmail}>
            Resend code!
          </Button>
        </Alert>
      )}
      {verified === 1 && (
        <Alert severity="success">
          Email validated successfully! You can go back to the{' '}
          <a href="/">Home</a> page!
        </Alert>
      )}
    </ThemeProvider>
  )
}
