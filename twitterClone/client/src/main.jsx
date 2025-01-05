import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import {Provider} from 'react-redux'
import { twitterStore } from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'

let persistor = persistStore(twitterStore)
createRoot(document.getElementById('root')).render(
  <Provider store={twitterStore}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    <Toaster/>

    </PersistGate>
  </Provider>,
)
