import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useParams } from 'react-router-dom'
import UserForm from './components/UserForm'
import StreakDashboard from './components/StreakDashboard'
import UserList from './components/UserList'
import Questions from './components/Questions'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

// Wrapper component to get URL parameters
const StreakDashboardWrapper = () => {
  const { userId } = useParams();
  return <StreakDashboard userId={userId} />;
};

function App() {
  const [currentUser, setCurrentUser] = useState(null)


  const handleUserCreated = (user) => {
    setCurrentUser(user)
  }

  const handleUserSelect = (user) => {
    setCurrentUser(user)
  }

  return (
    <Router>
      <div style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} className="min-h-screen transition-colors duration-200">
        
        <h1 className="streak-header text-center mb-4" style={{ color: 'var(--text-color)' }}>Streak Tracker</h1>
        <div className="container-fluid">
          <div className="row">
            {/* <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <UserList onUserSelect={handleUserSelect} />
                </div>
              </div>
            </div> */}
            <div className="col-md-3 mb-4">
              <div className="card h-100" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}>
                <div className="card-body">
                  <Routes>
                    <Route
                      path="/"
                      element={
                        currentUser ? (
                          <Navigate to={`/dashboard/${currentUser._id}`} />
                        ) : (
                          <div className="card p-6" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}>
                            <UserForm onUserCreated={handleUserCreated} />
                          </div>
                        )
                      }
                    />
                    <Route
                      path="/dashboard/:userId"
                      element={<StreakDashboardWrapper />}
                    />
                  </Routes>
                </div>
              </div>
            </div>
            <div className="col-md-9 mb-4">
              <div className="card" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}>
                <div className="card-body">
                  <Questions />
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            {/* <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <Questions />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
