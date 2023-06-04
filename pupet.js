const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/modul/modul.pdf');

  await page.setViewport({width: 1080, height: 1024});

  // Enter username and password
  await page.type('#password', 'maintain');

  // Click on the login button
  await page.click('#login');

  console.log(page.url());

  // Wait for navigation to complete

  // Verify login success
  const loggedInElement = await page.$('#menu');
  if (loggedInElement) {
    console.log('Login successful!');
// Navigate to the URL that points to the cstecgi.cgi script
await page.waitForResponse(response => response.url().includes('cstecgi.cgi'));

// Get the response data from the network request
const response = await page.waitForResponse(response => response.url().includes('cstecgi.cgi'));
const responseData = await response.json(); // Assuming the response data is in JSON format

// Extract the desired data from the response data
const desiredData = responseData; // Replace 'someKey' with the actual key for the desired data

// Do something with the desired data
console.log('Desired Data:', desiredData);
    
  } else {
    console.log('Login failed.');
  }

  await browser.close();
})();