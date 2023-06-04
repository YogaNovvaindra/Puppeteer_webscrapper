const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://10.0.0.254/login.asp');

  await page.setViewport({width: 1920, height: 1080});

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

    const MenuFrame = page.frames().find(frame => frame.name() === 'menu');
    // Navigate within the "top" frame
     const click_menu = await MenuFrame.goto('http://10.0.0.254/adm/status.asp');
    
    if (MenuFrame) {
      console.log('Load menu successful!');
      
      const menuElements = await MenuFrame.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('*'));
        return elements.map(element => element.outerHTML);
      });
  
       console.log('All elements in menu frame:', menuElements);

       const value = await MenuFrame.$eval('#wifiOff1', el => el.value);

      console.log('Value from wifiOff1:', value);

    } else {
      console.log('Click menu failed.');
    }


  } else {
    console.log('Login failed.');
  }

  await browser.close();
})();