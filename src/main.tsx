import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import InvitationPhoto from './InvitationPhoto'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InvitationPhoto />
  </StrictMode>,
)
