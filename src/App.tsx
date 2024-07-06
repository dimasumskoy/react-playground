import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Layout";

import Main from "./features/main/Main";
import Counter from "./features/counter/Counter";
import Devices from "./features/devices/Devices";
import List from "./features/virtualizedList/List";
import InfiniteScroll from "./features/infiniteScroll/InfiniteScroll";
import Clock from "./features/clock/Clock";
import TicTacToe from "./features/tic-tac-toe/TicTacToe";
import Pagination from "./features/pagination/Pagination";
import CheckboxMove from "./features/checkboxMove/CheckboxMove";
import ModalContainer from "./features/modalPortal/ModalContainer";

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
          <Route path="/infinite-scroll" element={<InfiniteScroll />} />
          <Route path="/clock" element={<Clock />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/pagination" element={<Pagination />} />
          <Route path="/checkbox-move" element={<CheckboxMove />} />
          <Route path="/modal" element={<ModalContainer />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
