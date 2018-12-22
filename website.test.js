// function sum(a, b) {
//   return a + b;
// }

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });

//////////////////

// import puppeteer from 'puppeteer';

// describe('Google', () => {
//   let page;
//   let browser;

//   beforeAll(async () => {
//     browser = await puppeteer.launch();
//     page = await browser.newPage();
//     await page.goto('https://google.com');
//   });

//   it('should display "google" text on page', async () => {
//     await page.screenshot({ path: 'screenshot.png' });
//     await expect(page).toMatch('google');
//   });

//   afterAll(async () => {
//     await browser.close();
//   });
// });

/////////////////////////////

const {
  setup,
  teardown
} = require('jest-dev-server');

jest.setTimeout(120000);

describe('Bookup Website', () => {
  beforeAll(async () => {
    await setup({
      command: 'node server.js',
      launchTimeout: 300000,
      port: 3000,
    });
    await page.goto('http://localhost:3000/', { timeout: 0 });
  });

  it('should be able to login', async () => {
    await page.screenshot({ path: 'screenshot.png' });
    await expect(page).toMatch('a');

    // await expect(page).toClick('button', { text: 'login' });
    // await page.waitForNavigation();
    // await expect(page).toFill('input[name="email"]', 'admin@bookup.team');
    // await expect(page).toFill('input[name="password"]', 'K8HTB/sM%)Nz<wCh');

    // await expect(page).toClick('button', { text: 'login' });
    // await page.waitForNavigation();
    // await expect(page).toMatch('Welcome');
  });

  afterAll(async () => {
    await teardown();
  });
});
