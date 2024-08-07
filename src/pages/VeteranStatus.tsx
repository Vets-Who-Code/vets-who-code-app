import { useState } from "react";
import axios from "axios";

const VeteranStatus = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        birthDate: "",
        ssn: "",
    });

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/veteran-status", formData);
            setResponse(res.data);
            setError(null);
        } catch (err) {
            setError("Failed to fetch veteran status");
            setResponse(null);
        }
    };

    return (
        <div>
            <h1>Check Veteran Status</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Birth Date:</label>
                    <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>SSN:</label>
                    <input
                        type="text"
                        name="ssn"
                        value={formData.ssn}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Check Status</button>
            </form>
            {response && <div>Status: {response.status}</div>}
            {error && <div>Error: {error}</div>}
        </div>
    );
};

export default VeteranStatus;
