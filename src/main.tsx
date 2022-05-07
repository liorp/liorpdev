import { createRoot } from 'react-dom/client'
import 'virtual:windi.css'
import './index.css'
import App from './App'

const container = document.getElementById('root')
if (!container) throw new Error('Failed to find the root element')
// Create a root.
const root = createRoot(container)

// Initial render
root.render(<App />)
