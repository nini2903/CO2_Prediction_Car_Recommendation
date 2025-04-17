import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PredictForm from "./components/PredictForm";
import RecommendForm from "./components/RecommendForm";

const App: React.FC = () => {
    return (
        <Router>
            <div style={containerStyle}>
                <h1 style={headerStyle}>Car Emission Prediction and Recommendation</h1>
                <nav style={navStyle}>
                    <Link to="/predict" style={linkStyle}>
                        Predict CO2
                    </Link>
                    <Link to="/recommend" style={linkStyle}>
                        Recommend Cars
                    </Link>
                </nav>
                <div style={contentStyle}>
                    <Routes>
                        <Route path="/predict" element={<PredictForm />} />
                        <Route path="/recommend" element={<RecommendForm />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

const containerStyle: React.CSSProperties = {
    textAlign: "center",
    backgroundColor: "#E3F2FD",
    minHeight: "100vh",
    padding: "20px",
};

const headerStyle: React.CSSProperties = {
    color: "#1976D2",
    marginBottom: "20px",
};

const navStyle: React.CSSProperties = {
    marginBottom: "20px",
};

const linkStyle: React.CSSProperties = {
    margin: "0 15px",
    padding: "10px 20px",
    textDecoration: "none",
    color: "white",
    backgroundColor: "#1976D2",
    borderRadius: "5px",
};

const contentStyle: React.CSSProperties = {
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    width: "60%",
    margin: "auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

export default App;
