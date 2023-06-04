const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
  });
  const page = await browser.newPage();

  await page.goto('http://10.0.0.254/login.asp');

  await page.setViewport({ width: 1280, height: 720 });

  // Enter username and password
  await page.type('#password', 'maintain');

  // Click on the login button
  await page.click('#login');

  await page.waitForNavigation(); // Wait for page navigation to complete

  console.log(page.url());

    console.log('Login successful!');

    await page.waitForTimeout(2000);
    
    // Wait for the element to be visible or interactive within the frame
    // await frame2.waitForSelector('.left_title_out2', { visible: true });
    await page.mouse.move(50, 250);
    await page.mouse.down();
    await page.mouse.up();

    console.log('click');
    
    // await page.waitForTimeout(2000);
    for (let i = 0; i < 3; i++) {
      const response = await page.waitForResponse(response => response.url().includes('cstecgi.cgi'));
      const responseData = await response.json(); // Assuming the response data is in JSON format
  
      // Extract the desired data from the response data
      const desiredData = responseData; // Replace 'someKey' with the actual key for the desired data
      if (i === 2) { // Check if loop number is 2
        // const response = await page.waitForResponse(response => response.url().includes('cstecgi.cgi'));
        // const responseData = await response.json(); // Assuming the response data is in JSON format
    
        // // Extract the desired data from the response data
        // const desiredData = responseData; // Replace 'someKey' with the actual key for the desired data
        console.log('Loop number 2 - Desired Data:', responseData);
        rssi = responseData[0].rssi;
        console.log(`RSSI:`, rssi);
      }
    }

  await page.screenshot({ path: "example.png" });

  await browser.close();
})();
