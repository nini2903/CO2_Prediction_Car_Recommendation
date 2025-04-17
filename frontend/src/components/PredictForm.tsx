import React, { useState } from "react";
import { predictCO2 } from "../api/api";

const PredictForm: React.FC = () => {
    const [formData, setFormData] = useState({
        make: "",
        model: "",
        vehicle_class: "",
        engine_size: 0,
        cylinders: 0,
        transmission: "",
        fuel_type: "",
        fuel_consumption: 0,
        ml_model: 0,
    });

    const [result, setResult] = useState<number | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const prediction = await predictCO2(formData);
        setResult(prediction.prediction);
    };

    const makes = Object.keys({
        'ACURA': 0, 'ALFA ROMEO': 1, 'ASTON MARTIN': 2, 'AUDI': 3, 'BENTLEY': 4, 'BMW': 5,
        'BUGATTI': 6, 'BUICK': 7, 'CADILLAC': 8, 'CHEVROLET': 9, 'CHRYSLER': 10, 'DODGE': 11,
        'FIAT': 12, 'FORD': 13, 'GENESIS': 14, 'GMC': 15, 'HONDA': 16, 'HYUNDAI': 17, 'INFINITI': 18,
        'JAGUAR': 19, 'JEEP': 20, 'KIA': 21, 'LAMBORGHINI': 22, 'LAND ROVER': 23, 'LEXUS': 24,
        'LINCOLN': 25, 'MASERATI': 26, 'MAZDA': 27, 'MERCEDES-BENZ': 28, 'MINI': 29,
        'MITSUBISHI': 30, 'NISSAN': 31, 'PORSCHE': 32, 'RAM': 33, 'ROLLS-ROYCE': 34, 'SCION': 35,
        'SMART': 36, 'SRT': 37, 'SUBARU': 38, 'TOYOTA': 39, 'VOLKSWAGEN': 40, 'VOLVO': 41,
    });

    const vehicleClasses = Object.keys({
        'COMPACT': 0, 'FULL-SIZE': 1, 'MID-SIZE': 2, 'MINICOMPACT': 3, 'MINIVAN': 4,
        'PICKUP TRUCK - SMALL': 5, 'PICKUP TRUCK - STANDARD': 6,
        'SPECIAL PURPOSE VEHICLE': 7, 'STATION WAGON - MID-SIZE': 8,
        'STATION WAGON - SMALL': 9, 'SUBCOMPACT': 10, 'SUV - SMALL': 11,
        'SUV - STANDARD': 12, 'TWO-SEATER': 13, 'VAN - CARGO': 14, 'VAN - PASSENGER': 15,
    });

    const transmissions = Object.keys({
        'A10': 0, 'A4': 1, 'A5': 2, 'A6': 3, 'A7': 4, 'A8': 5, 'A9': 6, 'AM5': 7, 'AM6': 8, 'AM7': 9,
        'AM8': 10, 'AM9': 11, 'AS10': 12, 'AS4': 13, 'AS5': 14, 'AS6': 15, 'AS7': 16, 'AS8': 17, 'AS9': 18,
        'AV': 19, 'AV10': 20, 'AV6': 21, 'AV7': 22, 'AV8': 23, 'M5': 24, 'M6': 25, 'M7': 26,
    });

    const fuelTypes = Object.keys({
        'D': 0, 'E': 1, 'N': 2, 'X': 3, 'Z': 4,
    });

    return (
        <div style={containerStyle}>
            <h2 style={headerStyle}>Predict CO2 Emission</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                <select name="make" onChange={handleChange} style={inputStyle}>
                    <option value="">Select Company of Vehicle</option>
                    {makes.map((make) => (
                        <option key={make} value={make}>
                            {make}
                        </option>
                    ))}
                </select>
                <input type="text" name="model" placeholder="Car Model (e.g., 1500 4X4)" onChange={handleChange} style={inputStyle} />
                <select name="vehicle_class" onChange={handleChange} style={inputStyle}>
                    <option value="">Select Class of Vehicle</option>
                    {vehicleClasses.map((vehicleClass) => (
                        <option key={vehicleClass} value={vehicleClass}>
                            {vehicleClass}
                        </option>
                    ))}
                </select>
                <input type="number" name="engine_size" placeholder="Engine Size (L)" onChange={handleChange} step="any" style={inputStyle} />
                <input type="number" name="cylinders" placeholder="Number of Cylinders" onChange={handleChange} step="any" style={inputStyle} />
                <select name="transmission" onChange={handleChange} style={inputStyle}>
                    <option value="">Select Transmission Type</option>
                    {transmissions.map((transmission) => (
                        <option key={transmission} value={transmission}>
                            {transmission}
                        </option>
                    ))}
                </select>
                <select name="fuel_type" onChange={handleChange} style={inputStyle}>
                    <option value="">Select Fuel Type</option>
                    {fuelTypes.map((fuelType) => (
                        <option key={fuelType} value={fuelType}>
                            {fuelType}
                        </option>
                    ))}
                </select>
                <input type="number" name="fuel_consumption" placeholder="Combined Fuel Consumption (L/100 km)" onChange={handleChange} step="any" style={inputStyle} />
                <select name="ml_model" onChange={handleChange} style={inputStyle}>
                    <option value="0">Decision Tree</option>
                    <option value="1">Linear Regression</option>
                </select>
                <button type="submit" style={buttonStyle}>Predict</button>
            </form>
            {result !== null && <p style={resultStyle}>Predicted CO2 Emission: {result}  g/km</p>}
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
    boxSizing: "border-box",
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

const resultStyle: React.CSSProperties = {
    marginTop: "20px",
    color: "#004d40",
    fontWeight: "bold",
};

export default PredictForm;
