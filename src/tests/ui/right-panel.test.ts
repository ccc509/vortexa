import puppeteer from "puppeteer";
import {
  CLEAR_BUTTON_XPATH,
  NUM_OF_CONCRETE_RAMPS_XPATH,
  GRAVEL_CELL_XPATH,
  RAMPS_SMALLER_THAN_50_CELL_XPATH,
  NUM_OF_RAMPS_BETWEEN_500_AND_200_XPATH
} from "./constants";

describe("Right panel", () => {
  let browser:puppeteer.Browser;
  let page:puppeteer.Page;

  beforeAll(async() => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
  });

  beforeEach(async() => {
    const clearButton = (await page.$x(CLEAR_BUTTON_XPATH))[0];
    await clearButton.click();
  });

  it("When one material is selected, ramps with other material should be excluded", async () => {
    const gravelCell = (await page.$x(GRAVEL_CELL_XPATH))[0];
    const numOfConcreteRampsCell = (await page.$x(NUM_OF_CONCRETE_RAMPS_XPATH))[0];

    const numOfConcreteRampsCellBefore = await page.evaluate((h1) => h1.textContent, numOfConcreteRampsCell);
    expect(+numOfConcreteRampsCellBefore).toBeGreaterThan(0);
    
    await gravelCell.click();
    const numOfConcreteRampsCellAfter = await page.evaluate((h1) => h1.textContent, numOfConcreteRampsCell);
    expect(+numOfConcreteRampsCellAfter).toBe(0);
  });

  it("When one size interval is selected, ramps between other size intervals should be excluded", async () => {
    const sizeSmallerThan50Cell = (await page.$x(RAMPS_SMALLER_THAN_50_CELL_XPATH))[0];
    const numOfConcreteRampsCell = (await page.$x(NUM_OF_RAMPS_BETWEEN_500_AND_200_XPATH))[0];

    const numOfRampsBetween50and200Before = await page.evaluate((h1) => h1.textContent, numOfConcreteRampsCell);
    expect(+numOfRampsBetween50and200Before).toBeGreaterThan(0);
    
    await sizeSmallerThan50Cell.click();
    const numOfRampsBetween50and200After = await page.evaluate((h1) => h1.textContent, numOfConcreteRampsCell);
    expect(+numOfRampsBetween50and200After).toBe(0);
  });

  it("When clear button is clicked, all ramps should be included", async () => {
    const gravelCell = (await page.$x(GRAVEL_CELL_XPATH))[0];
    const numOfConcreteRampsCell = (await page.$x(NUM_OF_CONCRETE_RAMPS_XPATH))[0];

    // Click gravel cell    
    await gravelCell.click();

    // Make sure only ramps with gravel material are included
    const numOfConcreteRampsCellBefore = await page.evaluate((h1) => h1.textContent, numOfConcreteRampsCell);
    expect(+numOfConcreteRampsCellBefore).toBe(0);

    // Click clear button
    const clearButton = (await page.$x(CLEAR_BUTTON_XPATH))[0];
    await clearButton.click();

    // Make sure all ramps are included     
    const numOfConcreteRampsCellAfter = await page.evaluate((h1) => h1.textContent, numOfConcreteRampsCell);
    expect(+numOfConcreteRampsCellAfter).toBeGreaterThan(0);
  });

  afterAll(async () => {
    await browser.close();
  });
});
  