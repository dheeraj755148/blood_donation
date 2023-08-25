import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { AuthProvider } from './AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'top', // Position vertically at the top
        horizontal: 'left', // Position horizontally at the left
      }}
    >
      <AuthProvider>
        <App />
      </AuthProvider>
    </SnackbarProvider>
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
