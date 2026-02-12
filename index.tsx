import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});

const initializeApp = () => {
    let msalInstance: PublicClientApplication | null = null;

    try {
        msalInstance = new PublicClientApplication(msalConfig);
    } catch (e) {
        console.warn("MSAL could not be initialized. Authentication features will be disabled.", e);
    }

    const rootElement = document.getElementById('root');
    if (!rootElement) {
        console.error("Root element not found");
        return;
    }

    const root = createRoot(rootElement);

    const Main = () => (
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </React.StrictMode>
    );

    if (msalInstance) {
        root.render(
            <MsalProvider instance={msalInstance}>
                <Main />
            </MsalProvider>
        );
    } else {
        root.render(<Main />);
    }
};

// Initialize the app immediately if the DOM is already ready, otherwise wait for DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
