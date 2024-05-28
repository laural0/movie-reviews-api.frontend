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
import './ResendCode.css'

const theme = createTheme()

export default function ResendCode() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    const data = new FormData(event.currentTarget)
    const emailAddress = data.get('emailAddress')

    console.log(emailAddress)
    axios
      .get(`http://localhost:3000/resendVerificationMail/${emailAddress}`)
      .then((response) => {
        console.log('email sent successfully!')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className="resend-box">
          <Avatar className="resend-avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Resend verification
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
                  id="emailAddress"
                  label="Email Address"
                  name="emailAddress"
                  autoComplete="email"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="resend-button"
            >
              Resend verification code!
            </Button>
          </Box>
        </Box>
        {submitted && (
          <Alert severity="success">
            Success! If the email you specified exists in our database, you
            received a new activation code! Make sure to also check the
            Spam/Junk folder in your inbox.
          </Alert>
        )}
      </Container>
    </ThemeProvider>
  )
}
