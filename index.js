import express from 'express';
import * as dotenv from "dotenv";

const app = express();
const port = 3000;
const API_ENDPOINT = 'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=';


app.get('/status', async (req, res) => {
    res.status(200).send('healthy');
});

app.get('/gas', async (req, res) => {
    const res = await axios.get(API_ENDPOINT + apiKey);
    if (res == null) {
        res.status(404).json({error: true, message: "Failed to retrieve gas price"});
    } else {
        gasPriceInfo = res.data.result
        res.status(200).json({
            error: false,
            message: { ...gasPriceInfo }
        });
    }
});

app.get('/average', async (req, res) => {
    const response = await axios.get(API_ENDPOINT + apiKey);
    if (response == null) {
        res.status(404).json({ error: true, message: "Failed to retrieve gas price" });
    } else {
        const gasPriceInfo = response.data.result;
        const { high, low } = gasPriceInfo;

        // Calculate the average gas price
        const average = (high + low) / 2;

        res.status(200).json({
            error: false,
            message: {
                average
            }
        });
    }
});

app.listen(port, async () => {
    dotenv.config();
    return console.log(`Listening at: http://localhost:${port}`);
});