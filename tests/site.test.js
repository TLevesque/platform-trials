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
    await page.goto('http://localhost:3000/', { timeout: 0, waitUntil: 'networkidle2' });
  });

  it('should be able to find post in the page', async () => {
    await expect(page).toMatch('post');
    await page.screenshot({ path: 'tests/screenshots/screenshot111.png' });
  });

  it('should be able to click on post link', async () => {
    await expect(page).toClick('a', { text: 'post' });
    await page.waitForNavigation();
    await page.screenshot({ path: 'tests/screenshots/screenshot222.png' });
  });

  afterAll(async () => {
    await teardown();
  });
});
