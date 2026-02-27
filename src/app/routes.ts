import { createBrowserRouter } from 'react-router';
import { RootLayout } from './components/RootLayout';
import { ProtectedLayout } from './components/ProtectedLayout';
import { AccountLayout } from './components/AccountLayout';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { AuthCallbackPage } from './pages/AuthCallbackPage';
import { ProcessingPage } from './pages/ProcessingPage';
import { DashboardPage } from './pages/DashboardPage';
import { JobComparatorPage } from './pages/JobComparatorPage';
import { MessageGeneratorPage } from './pages/MessageGeneratorPage';
import { AccountPage } from './pages/AccountPage';
import { PlanPage } from './pages/PlanPage';
import { AnalysesPage } from './pages/AnalysesPage';
import { JobsActivityPage } from './pages/JobsActivityPage';
import { MessagesActivityPage } from './pages/MessagesActivityPage';

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
          {
            path: '/conta',
            Component: AccountLayout,
            children: [
              { index: true, Component: AccountPage },
              { path: 'plano', Component: PlanPage },
              { path: 'analises', Component: AnalysesPage },
              { path: 'vagas', Component: JobsActivityPage },
              { path: 'mensagens', Component: MessagesActivityPage },
            ],
          },
        ],
      },
    ],
  },
]);
