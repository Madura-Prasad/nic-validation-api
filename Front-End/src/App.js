import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddUser from "./users/AddUser";
import EditUser from "./users/EditUser";
import ViewUser from "./users/ViewUser";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/add" element={<AddUser/>}/>
            <Route exact path="/editUser/:id" element={<EditUser/>}/>
            <Route exact path="/viewUser/:id" element={<ViewUser/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
