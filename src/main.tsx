import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {AuthProvider} from './contexts/AuthContext.tsx'
import { StudioProvider } from './contexts/StudioContext.tsx';


createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <AuthProvider>
    <StudioProvider> 
      <App />
    </StudioProvider>
    </AuthProvider>
  </StrictMode>,

)
