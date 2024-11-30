import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import TaskListingPage from "./pages/TaskListingPage";
import TaskCreationPage from "./pages/TaskCreationPage";
import TaskEditPage from "./pages/TaskEditPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  return (
    <Router>
      <Header title="Task Manager" />
      <Routes>
        <Route path="/" element={<TaskListingPage />} />
        <Route path="/create" element={<TaskCreationPage />} />
        <Route path="/edit/:id" element={<TaskEditPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App