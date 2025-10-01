import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HeroUIProvider } from '@heroui/react'
import { Provider } from 'react-redux';
import store from './ReduxStore/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <HeroUIProvider>
          <App />
      </HeroUIProvider>
    </Provider>
  </StrictMode>,
)
