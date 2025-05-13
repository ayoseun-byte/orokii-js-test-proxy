const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3002;

app.use(express.json());
app.use(cors()); // Enable CORS for all origins

// Replace with your credentials
const MERCHANT_SECRET = process.env.MERCHANT_SECRET
const CLIENT_AUTH = process.env.CLIENT_AUTH
const MERCHANT_ID = process.env.MERCHANT_ID
const AUTH_HEADER = "Basic " + Buffer.from(`${CLIENT_AUTH}:${MERCHANT_SECRET}`).toString("base64");
const BASE_URL = process.env.BASE_URL
const CRYPTO_BASE_URL = process.env.CRYPTO_BASE_URL
const CRYPTO_API_KEYS = process.env.CRYPTO_API_KEYS
const BTC_PAY_BASE_URL = process.env.BTC_PAY_BASE_URL
const BTC_PAY_API_KEY = process.env.BTC_PAY_API_KEY
//generate uuid npm install uuid
const { v4: uuidv4 } = require('uuid');

function generateUUID() {
    return uuidv4();
}

app.get("/proxy", async (req, res) => {

    const url = `${BASE_URL}/auth/${MERCHANT_ID}/get-access-token`;

    try {
        const response = await axios.post(
            url,
            { uniqueId: generateUUID() }, // Payload
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


app.post("/btc-pay", async (req, res) => {

    const { amount } = req.body;

    try {
        const response = await axios.post(
            BTC_PAY_BASE_URL,
            { amount: amount, currency: 'USD' },
            { 'Authorization': `token ${BTC_PAY_API_KEY}`, 'Content-Type': 'application/json' }
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

app.get("/utils/crypto-prices/:ids", async (req, res) => {

    const url = `${CRYPTO_BASE_URL}${req.params.ids}&vs_currencies=usd&precision=full`;
    try {
        const response = await axios.get(
            url, {
            'Accept': 'application/json',
            'x-cg-api-key': CRYPTO_API_KEYS
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

app.post("/payment/nuvei/tokenized-payment", async (req, res) => {
    const url = `${BASE_URL}/payment/nuvei/tokenized-payment`;
    const body = req.body;
    const headers = {
        'Content-Type': 'application/json',
        'x-orokii-client-id': req.headers['x-orokii-client-id'],
        'Authorization': req.headers['authorization'], // Keep token intact
    };

    try {
        const response = await axios.post(
            url,
            body,
            {
                headers: headers
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

app.post("/payment/nuvei/simple-card-tokenized", async (req, res) => {
    const url = `${BASE_URL}/api/v1/payment/nuvei/simple-card-tokenized`;
    const body = req.body;
    const headers = {
        'Content-Type': 'application/json',
        'x-orokii-client-id': req.headers['x-orokii-client-id'],
        'Authorization': req.headers['authorization'], // Keep token intact
    };

    try {
        const response = await axios.post(
            url,
            body,
            {
                headers: headers
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

app.post("/payment/nuvei/payment-ach-token-id", async (req, res) => {
    const url = `${BASE_URL}/api/v1/payment/nuvei/payment-ach-token-id`;
    const body = req.body;
    const headers = {
        'Content-Type': 'application/json',
        'x-orokii-client-id': req.headers['x-orokii-client-id'],
        'Authorization': req.headers['authorization'], // Keep token intact
    };

    try {
        const response = await axios.post(
            url,
            body,
            {
                headers: headers
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

app.post("/payment/nuvei/payment-ach", async (req, res) => {
    const url = `${BASE_URL}/api/v1/payment/nuvei/payment-ach`;
    const body = req.body;
    const headers = {
        'Content-Type': 'application/json',
        'x-orokii-client-id': req.headers['x-orokii-client-id'],
        'Authorization': req.headers['authorization'], // Keep token intact
    };

    try {
        const response = await axios.post(
            url,
            body,
            {
                headers: headers
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
