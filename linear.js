const puppeteer = new require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/modul/modul.pdf');

    await page.setViewport({ width: 1080, height: 1920 });

    await page.waitForTimeout(2000);

    await page.screenshot({ path: "tes.png" });
    await browser.close();
})();

