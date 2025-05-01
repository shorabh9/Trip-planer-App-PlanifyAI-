import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/custom/Header.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Viewtrip from './view-trip/[tripId]/index.jsx'
import MyTrip from './components/custom/MyTrip.jsx'

// Create a Layout component that includes the Header
function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <App />
      </Layout>
    )
  },
  {
    path: '/create-trip',
    element: (
      <Layout>
        <CreateTrip />
      </Layout>
    )
  },
  {
    path: '/view-trip/:tripId',
    element: (
      <Layout>
        <Viewtrip />
      </Layout>
    )
  },
  {
    path: '/my-trips',
    element: (
      <Layout>
        <MyTrip />
      </Layout>
    )
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>,
)