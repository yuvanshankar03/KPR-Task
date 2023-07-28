import Login from './login';
import Create from './signup';
import { HashRouter,Routes,Route } from "react-router-dom";

function App() {
  return (<><HashRouter>
  <Routes>
      <Route path="/" element={<Create />} />
      <Route path="/login" element={<Login />} />
  </Routes>
  </HashRouter>
  </>
  );
}

export default App;
