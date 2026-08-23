const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 400, height: 800 });
  await page.goto('http://localhost:3000/doctors', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: '/Users/mohdkhalid/Desktop/Freelancer/medical tourism/screenshot.png', fullPage: true });
  await browser.close();
})();
