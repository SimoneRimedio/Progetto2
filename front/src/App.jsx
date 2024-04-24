import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Test from './pages/LoginPage';
import Page404 from "./pages/Page404";
import SchedulingTable from "./pages/Table";
import Login from "./pages/LoginPage";
import '../src/index.css'; // Importa i fogli di stile globali


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} /> {/* Homepage - DON'T TOUCH */}
        <Route path="/test" element={<Test />} /> {/* Put any pages you want */}
        <Route path="/table" element={<SchedulingTable />} /> {/* Schedule Table page */}
        <Route path="/login" element={<Login />} /> {/* Schedule Table page */}
        <Route path="*" element={<Page404 />} /> {/* Page 404 */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
