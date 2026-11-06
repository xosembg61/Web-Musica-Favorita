import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './style.css'

import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import App from './AppPage.jsx'

createRoot(document.getElementById('root')).render(createElement(App))