import { createBrowserRouter } from 'react-router';
import { LandingPage } from './pages/LandingPage';
import { ProcessingPage } from './pages/ProcessingPage';
import { DashboardPage } from './pages/DashboardPage';
import { JobComparatorPage } from './pages/JobComparatorPage';
import { MessageGeneratorPage } from './pages/MessageGeneratorPage';

export const router = createBrowserRouter([
  { path: '/', Component: LandingPage },
  { path: '/processing', Component: ProcessingPage },
  { path: '/dashboard', Component: DashboardPage },
  { path: '/comparador', Component: JobComparatorPage },
  { path: '/mensagens', Component: MessageGeneratorPage },
]);
