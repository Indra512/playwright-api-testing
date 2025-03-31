import { test, expect, request } from "@playwright/test";
import fs = require('fs');

test("GET Request - Fetch Users", async ({ request }) => {
    const response = await request.get("https://jsonplaceholder.typicode.com/users");
    expect(response.status()).toBe(200);
    const users = await response.json();
    expect(users.length).toBeGreaterThan(0);
});

test("POST Request - Create User", async ({ request }) => {
    const response = await request.post("https://jsonplaceholder.typicode.com/users", {
        data: {
            name: "John Doe",
            email: "john@example.com",
        },
    });

    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.name).toBe("John Doe");
});

test("POST Request - Upload json file 1", async () => {
    const apiContext = await request.newContext();

    const jsonData = fs.readFileSync('data.json', 'utf-8');

    const response = await apiContext.post('https://jsonplaceholder.typicode.com/users', {
        headers: { 'Content-Type': 'application/json' },
        data: JSON.parse(jsonData)
    });

    console.log(await response.json());
});


test("POST Request - Upload xml file 1", async () => {

    const apiContext = await request.newContext();
    const response = await apiContext.post('https://jsonplaceholder.typicode.com/users', {
        multipart: {
            xmlFile: {
                name: 'data.xml',
                mimeType: 'application/xml',
                buffer: fs.readFileSync('data.xml')
            }
        }
    })

    console.log(await response.json());
});

test("POST Request - Upload csv file 1", async () => {

    const apiContext = await request.newContext();
    const response = await apiContext.post('https://jsonplaceholder.typicode.com/users', {
        multipart: {
            xmlFile: {
                name: 'data.csv',
                mimeType: 'text/csv',
                buffer: fs.readFileSync('data.csv')
            }
        }
    })

    console.log(await response.json());
});


test("POST Request - Upload json file 2", async () => {
    const apiContext = await request.newContext();

    const jsonData = fs.readFileSync('data.json', 'utf-8');

    const response = await apiContext.post('https://postman-echo.com/post', {
        headers: { 'Content-Type': 'application/json' },
        data: JSON.parse(jsonData)
    });

    console.log(await response.json());
});


test("POST Request - Upload xml file 2", async () => {

    const apiContext = await request.newContext();
    const response = await apiContext.post('https://postman-echo.com/post', {
        multipart: {
            xmlFile: {
                name: 'data.xml',
                mimeType: 'application/xml',
                buffer: fs.readFileSync('data.xml')
            }
        }
    })

    console.log(await response.json());
});

test("POST Request - Upload csv file 2", async () => {

    const apiContext = await request.newContext();
    const response = await apiContext.post('https://postman-echo.com/post', {
        multipart: {
            xmlFile: {
                name: 'data.csv',
                mimeType: 'text/csv',
                buffer: fs.readFileSync('data.csv')
            }
        }
    })

    console.log(await response.json());
});