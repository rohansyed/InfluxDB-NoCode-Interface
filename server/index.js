import express from "express";
import { InfluxDB, Point } from "@influxdata/influxdb-client";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();

const token = process.env.INFLUXDB_TOKEN;
const url = process.env.INFLUXDB_URL;
const org = process.env.INFLUXDB_ORG;
const bucket = process.env.INFLUXDB_BUCKET;
const admin_username = process.env.INFLUXDB_USERNAME;


const client = new InfluxDB({ url, token })
const queryClient = client.getQueryApi(org);

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());
// Enable parsing of JSON bodies in requests
app.use(express.json());

let bucketToWrite = `exclusive_bucket`

let writeClient = client.getWriteApi(org, bucketToWrite, 'ns')

for (let i = 0; i < 5; i++) {
    let point = new Point('measurement1')
        .tag('tagname1', 'tagvalue1')
        .intField('field1', i)

    void setTimeout(() => {
        writeClient.writePoint(point)
    }, i * 1000) // separate points by 1 second

    void setTimeout(() => {
        writeClient.flush()
    }, 5000)
}

app.get('/', (req, res) => {
    res.send('InfluxDB data writing in progress!');
});

app.get('/api/buckets', async (req, res) => {
    try {
        const query = `buckets()`;
        const buckets = await queryClient.collectRows(query);
        return res.json(buckets);
    } catch (error) {
        res.status(500).send('Error fetching buckets');
    }
});

// More routes for measurements and fields will be added here
app.get('/api/measurements/:bucket', async (req, res) => {
    const bucket = req.params.bucket;
    try {
        const query = `import "influxdata/influxdb/schema" schema.measurements(bucket: "${bucket}")`;
        const measurements = await queryClient.collectRows(query);
        res.json(measurements);
    } catch (error) {
        res.status(500).send('Error fetching measurements');
    }
});

app.get('/api/fields/:bucket/:measurement', async (req, res) => {
    const { bucket, measurement } = req.params;

    const query = `
    import "influxdata/influxdb/schema"
    schema.measurementFieldKeys(
        bucket: "${bucket}",
        measurement: "${measurement}"
    )
    |> yield(name: "fieldKeys")
    `;

    try {
        let rows = [];
        await queryClient.queryRows(query, {
            next(row, tableMeta) {
                const o = tableMeta.toObject(row);
                rows.push(o);
            },
            error(error) {
                console.error('InfluxDB Query Error:', error.message); // Log error message
                console.error('Stack Trace:', error.stack); // Log stack trace for more details
                res.status(500).send('Error querying data');
            },
            complete() {
                res.json(rows);
            }
        });
    } catch (error) {
        console.error('Error querying InfluxDB', error);
        res.status(500).send('Error querying data');
    }
});

// Login endpoint using InfluxDB API token for auth
app.post('/api/login', async (req, res) => {
    const { username, apiToken } = req.body;

    if (!username || !apiToken) {
        return res.status(400).send('Username and API token are required');
    }

    // checks if the API token works with InfluxDB (creates new InfluxDB client)
    const client = new InfluxDB({ url: process.env.INFLUXDB_URL, token: apiToken });
    const queryClient = client.getQueryApi(process.env.INFLUXDB_ORG);

    try {
        const query = `buckets()`;
        await queryClient.collectRows(query); // trying to fetch data with the provided token

        // username verification 
        if (username === admin_username) {
            res.status(200).send('Login successful');
        } else {
            return res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error('Invalid token or username:', error);
        res.status(401).send('Invalid credentials');
    }
});

// Endpoint to execute the Flux query (US3)
app.post('/api/execute-query', async (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).send('Flux query is required');
    }

    const apiToken = process.env.INFLUXDB_TOKEN;

    if (!apiToken) {
        return res.status(401).send('API token is required');
    }

    try {
        const client = new InfluxDB({ url: process.env.INFLUXDB_URL, token: apiToken });
        const queryClient = client.getQueryApi(process.env.INFLUXDB_ORG);

        let rows = [];
        await queryClient.queryRows(query, {
            next(row, tableMeta) {
                const o = tableMeta.toObject(row);
                rows.push(o);
            },
            error(error) {
                console.error('Error executing query:', error.message);
                res.status(500).send('Error executing query');
            },
            complete: () => {
                res.json(rows); // Sending query results back to frontend
            }
        });
    } catch (error) {
        console.error('Error querying InfluxDB:', error);
        res.status(500).send('Error querying InfluxDB');
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
