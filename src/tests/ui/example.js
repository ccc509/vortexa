const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');

  const title = await page.$x('//*[@id="root"]/div/div[2]/div[1]/table/thead/tr/th[1]');
  let text = await page.evaluate(h1 => h1.textContent, title[0]);
  console.log(text)
  

  await browser.close();
})();