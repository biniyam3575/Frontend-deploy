import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { DataProvider } from './components/DataProvider/DataProvider.jsx'
import {reducer,initialState} from './Utils/reducer.js'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
    <DataProvider reducer={reducer} initialState={initialState}>
      <App />
    </DataProvider>
  </StrictMode>
  </BrowserRouter>
  ,
)
