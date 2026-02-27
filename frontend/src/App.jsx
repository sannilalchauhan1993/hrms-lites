import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/layouts/Main';
import EmployeeDashboard from './pages/EmployeeDashboard.jsx';
import EmployeeList from './pages/EmployeeList.jsx';
import EmployeeAttendence from './pages/EmployeeAttendence.jsx';


function App() {
  return (
    <>
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />}>
                    <Route index element={<EmployeeDashboard />} />
                    <Route path="employees" element={<EmployeeList />} />
                    <Route path="attendance" element={<EmployeeAttendence />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
