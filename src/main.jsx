import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppContextProvider } from './context/AppContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </ThemeProvider>
)