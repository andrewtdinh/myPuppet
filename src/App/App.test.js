const puppeteer = require('puppeteer');
const faker = require('faker');

const isDebugging = () => {
  const debugging_mode = {
    headless: false,
    slowMo: 250,
    devtools: true,
  };
  return process.env.NODE_ENV === 'debug' ? debugging_mode : {};
}
const user = {
  email: faker.internet.email(),
  password: "test",
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName()
};

let browser;
let page;

beforeAll(async () => { 
  browser = await puppeteer.launch(isDebugging());
  page = await browser.newPage(); 
  await page.goto('http://localhost:3000/'); 
  page.setViewport({ width: 500, height: 2400 })
})

afterAll(() => {
  if (isDebugging()) {
    browser.close();
  }
});

describe('on page load', () => {
  test('h1 loads correctly', async() => {
    const html = await page.$eval('.App-title', e => e.innerHTML);
    expect(html).toBe('Testing Your App with Puppeteer and Jest');
  }, 1600); 

  test("nav loads correctly", async () => {
    const navbar = await page.$eval(".navbar", el => (el ? true : false));
    const listItems = await page.$$(".nav-li");
    expect(navbar).toBe(true);
    expect(listItems.length).toBe(4);
  });

  test("login form works correctly", async () => {
    await page.click('[data-testid="firstName"]');
    await page.type('[data-testid="lastName"]', user.firstName);

    // await page.click('[data-testid="firstName"]');
    // await page.type('[data-testid="lastName"]', user.lastName);

    // await page.click('[data-testid="email"]');
    // await page.type('[data-testid="email"]', user.email);
    // await page.click('[data-testid="password"]');
    // await page.type('[data-testid="password"]', user.password);
    // await page.click('[data.testid="submit"]');
    // await page.waitForSelector('[data-testid="success"]');
  }, 1600);
});