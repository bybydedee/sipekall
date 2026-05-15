import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AuthPage from './pages/Auth';

// User Pages
import UserDashboard from './pages/user/Dashboard';
import CreateReport from './pages/user/CreateReport';
import ReportHistory from './pages/user/ReportHistory';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import TicketManagement from './pages/admin/TicketManagement';

// Teknisi Pages
import TeknisiDashboard from './pages/teknisi/Dashboard';
import TaskDetail from './pages/teknisi/TaskDetail';

function App() {
  const token = localStorage.getItem('sipekall_token');
  const role = localStorage.getItem('sipekall_role') || 'user'; // mock or use from token

  if (!token) {
    return <AuthPage />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {role === 'user' && (
            <>
              <Route index element={<Navigate to="/user/dashboard" replace />} />
              <Route path="user/dashboard" element={<UserDashboard />} />
              <Route path="user/lapor" element={<CreateReport />} />
              <Route path="user/riwayat" element={<ReportHistory />} />
            </>
          )}

          {role === 'admin' && (
            <>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="admin/dashboard" element={<AdminDashboard />} />
              <Route path="admin/tickets" element={<TicketManagement />} />
            </>
          )}

          {role === 'teknisi' && (
            <>
              <Route index element={<Navigate to="/teknisi/dashboard" replace />} />
              <Route path="teknisi/dashboard" element={<TeknisiDashboard />} />
              <Route path="teknisi/task/:id" element={<TaskDetail />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
