import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CategoriesPage from "./pages/CategoriesPage";
import PembicaraPage from "./pages/PembicaraPage";
import EventsPage from "./pages/EventsPage";
import BiodataPage from "./pages/BiodataPage";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <CategoriesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pembicara"
          element={
            <ProtectedRoute>
              <PembicaraPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <EventsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/biodata"
          element={
            <ProtectedRoute>
              <BiodataPage />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;