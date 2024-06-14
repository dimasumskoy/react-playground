import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Layout";

import Main from "./features/main/Main";
import Counter from "./features/counter/Counter";
import Devices from "./features/devices/Devices";
import List from "./features/list/List";

import "./App.scss";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
