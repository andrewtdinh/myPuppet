const puppeteer = require('puppeteer');

const isDebugging = () => {
  const debugging_mode = {
    headless: false,
    slowMo: 250,
    devtools: true,
  };
  return process.env.NODE_ENV === 'debug' ? debugging_mode : {};
}

describe('on page load', () => {
  test('h1 loads correctly', async() => {
    let browser = await puppeteer.launch({});
    let page = await browser.newPage();
    
    page.emulate({
      viewport: {
        width: 500,
        height: 2400,
      },
      userAgent: ''
    });

    await page.goto('http://localhost:3000/');
    const html = await page.$eval('.App-title', e => e.innerHTML);
    expect(html).toBe('Testing Your App with Puppeteer and Jest');
    browser.close();
  }, 16000); 
});