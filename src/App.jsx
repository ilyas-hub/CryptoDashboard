import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer"; 
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/Overview";
import History from "./pages/History";

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1 md:flex-row">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-auto">
            <Header />
            <main className="p-6 flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/history" element={<History />} />
              </Routes>
            </main>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  </Provider>
);

export default App;
