import express from 'express';
import puppeteer from 'puppeteer';

const app = express();

app.get('/rssi', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      executablePath: '/usr/bin/google-chrome',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],

    });
    // const browser = await puppeteer.launch({
    //   headless: 'new',
    // });
    const page = await browser.newPage();

    await page.goto('http://10.0.0.254/login.asp');

    await page.setViewport({ width: 1280, height: 720 });

    // Enter username and password
    await page.type('#password', 'maintain');

    // Click on the login button
    await Promise.all([
      page.click('#login'),
      page.waitForNavigation(), // Wait for page navigation to complete
    ]);

    console.log('Login successful!');

    await page.waitForTimeout(20000);

    await page.mouse.move(50, 250);
    await page.mouse.down();
    await page.mouse.up();

    console.log('Click');

    let rssi;

    for (let i = 0; i < 3; i++) {
      const response = await page.waitForResponse(response =>
        response.url().includes('cstecgi.cgi')
      );
      const responseData = await response.json(); // Assuming the response data is in JSON format

      if (i === 2) {
        console.log('Loop number 2 - Desired Data:', responseData);
        rssi = responseData[0].rssi;
        console.log('RSSI:', rssi);
      }
    }

    // await page.screenshot({ path: 'example.png' });

    await browser.close();

    res.json({ rssi });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
