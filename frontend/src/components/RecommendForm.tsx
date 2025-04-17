import React, { useState } from "react";
import { recommendCar } from "../api/api";

const RecommendForm: React.FC = () => {
    const [formData, setFormData] = useState({
        desired_engine_size: 0,
        desired_cylinders: 0,
        desired_fuel_consumption: 0,
        desired_co2: 0,
    });

    const [recommendations, setRecommendations] = useState<any[]>([]);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const results = await recommendCar(formData);
        setRecommendations(results);
        setExpandedIndex(null);
    };

    const toggleDetails = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div style={containerStyle}>
            <h2 style={headerStyle}>Recommend Cars</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                <input
                    type="number"
                    name="desired_engine_size"
                    placeholder="Engine Size (L)"
                    onChange={handleChange}
                    step="any"
                    style={inputStyle}
                />
                <input
                    type="number"
                    name="desired_cylinders"
                    placeholder="Number of Cylinders"
                    onChange={handleChange}
                    step="any"
                    style={inputStyle}
                />
                <input
                    type="number"
                    name="desired_fuel_consumption"
                    placeholder="Combined Fuel Consumption (L/100 km)"
                    onChange={handleChange}
                    step="any"
                    style={inputStyle}
                />
                <input
                    type="number"
                    name="desired_co2"
                    placeholder="CO2 Emission (g/km)"
                    onChange={handleChange}
                    step="any"
                    style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>Recommend</button>
            </form>
            {recommendations.length > 0 && (
                <ul style={listStyle}>
                    {recommendations.map((car, index) => (
                        <li key={index} style={listItemStyle}>
                            <div onClick={() => toggleDetails(index)} style={carNameStyle}>
                                {car.make} - {car.model}
                            </div>
                            {expandedIndex === index && (
                                <div style={detailsStyle}>
                                    <p>Company : {car.make}</p>
                                    <p>Model: {car.model}</p>
                                    <p>Vehicle Class: {car.vehicle_class}</p>
                                    <p>Transmission Type: {car.transmission}</p>
                                    <p>Fuel Type: {car.fuel_type}</p>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const containerStyle: React.CSSProperties = {
    padding: "20px",
    backgroundColor: "#E3F2FD",
    borderRadius: "10px",
};

const headerStyle: React.CSSProperties = {
    color: "#1976D2",
};

const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
};

const inputStyle: React.CSSProperties = {
    margin: "10px 0",
    padding: "10px",
    width: "80%",
    borderRadius: "5px",
    border: "1px solid #ccc",
};

const buttonStyle: React.CSSProperties = {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#1976D2",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
};

const listStyle: React.CSSProperties = {
    marginTop: "20px",
    textAlign: "left",
    listStyleType: "none", // Loại bỏ bullet point
    padding: 0,
};

const listItemStyle: React.CSSProperties = {
    margin: "10px 0",
    padding: "10px",
    backgroundColor: "#ffffff",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

const carNameStyle: React.CSSProperties = {
    fontWeight: "bold",
    cursor: "pointer",
    color: "#1976D2",
};

const detailsStyle: React.CSSProperties = {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#F0F4C3",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

export default RecommendForm;
