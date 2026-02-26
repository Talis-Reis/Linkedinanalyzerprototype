import { createBrowserRouter } from 'react-router';
import { RootLayout } from './components/RootLayout';
import { ProtectedLayout } from './components/ProtectedLayout';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { AuthCallbackPage } from './pages/AuthCallbackPage';
import { ProcessingPage } from './pages/ProcessingPage';
import { DashboardPage } from './pages/DashboardPage';
import { JobComparatorPage } from './pages/JobComparatorPage';
import { MessageGeneratorPage } from './pages/MessageGeneratorPage';
import { AccountPage } from './pages/AccountPage';

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      { path: '/', Component: LandingPage },
      { path: '/auth', Component: AuthPage },
      { path: '/auth/callback', Component: AuthCallbackPage },
      {
        Component: ProtectedLayout,
        children: [
          { path: '/processing', Component: ProcessingPage },
          { path: '/dashboard', Component: DashboardPage },
          { path: '/comparador', Component: JobComparatorPage },
          { path: '/mensagens', Component: MessageGeneratorPage },
          { path: '/conta', Component: AccountPage },
        ],
      },
    ],
  },
]);