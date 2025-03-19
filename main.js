const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3002;

app.use(express.json());
app.use(cors()); // Enable CORS for all origins

// Replace with your credentials
const CLIENT_ID = "4121062054";
const CLIENT_SECRET = "6zz7U4m4YDRvAp0MNYALfNix4zy4sqeETnwMhn9a5kM=";
const MERCHANT_ID = "64b5f2fd-d97f-4797-91d7-d63fb2b5ed9c";
const AUTH_HEADER = "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

app.post("/proxy", async (req, res) => {
    const url = `https://orokii-ppg-gateway-api-730399970440.us-central1.run.app/api/v1/auth/${MERCHANT_ID}/get-access-token`;

    try {
        const response = await axios.post(
            url,
            { uniqueId: "c53430e6-f510-4d42-9887-2836dc5fa4eb" }, // Payload
            {
                headers: {
                    Authorization: AUTH_HEADER,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error("Error:", error.message);
        res.status(error.response?.status || 500).json({
            error: "Internal Server Error",
            details: error.response?.data || error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
