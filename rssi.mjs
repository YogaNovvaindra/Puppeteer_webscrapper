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

    // const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.goto('http://10.0.0.254/login.asp');

    await page.setViewport({ width: 1280, height: 720 });

    await page.type('#password', 'maintain');
    await Promise.all([page.click('#login'), page.waitForNavigation()]);

    console.log('Login successful!');

    await page.waitForTimeout(10000);

    await page.mouse.move(50, 250);
    await page.mouse.down();
    await page.mouse.up();

    console.log('Click');

    let rssi, dbm;

    while (true) {
      const response = await page.waitForResponse(response =>
        response.url().includes('cstecgi.cgi')
      );
      const responseData = await response.json();

      if (responseData[0]?.rssi !== undefined) {
        console.log('Desired Data:', responseData);
        rssi = responseData[0].rssi;
        dbm = responseData[0].dbm;
        // console.log('RSSI:', rssi);
        break;
      } else {
        console.log('No RSSI value');
        // console.log('Desired Data:', responseData);
      }
    }

    await page.screenshot({ path: 'example.png' });

    await browser.close();

    return res.json({ rssi, dbm });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
