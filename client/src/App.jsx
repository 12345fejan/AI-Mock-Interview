import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import InterviewSetup from "./pages/InterviewSetup";
import Interview from "./pages/Interview";
import Result from "./pages/Result";
import History from "./pages/History";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
          />
        <Route
          path="/interview-setup"
          element={
            <ProtectedRoute>
              <InterviewSetup />
            </ProtectedRoute>
          }

        />

        <Route
          path="/interview"
          element={
            <ProtectedRoute>

              <Interview/>

            </ProtectedRoute>
            }
/>

        <Route
        path="/result"
        element={
        <ProtectedRoute>

        <Result/>

        </ProtectedRoute>
        }
        />

          <Route
          path="/history"
          element={
          <ProtectedRoute>
          <History/>
          </ProtectedRoute>
          }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

      </Routes>

    </BrowserRouter>
  );
}

export default App;