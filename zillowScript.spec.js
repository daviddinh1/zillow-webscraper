const { By, Key, Builder, Browser, until } = require("selenium-webdriver");
const assert = require("assert");

(async function zillowScript() {
  let driver;
  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get("https://www.zillow.com/");

    // Wait until the search bar is located using its placeholder attribute
    const searchBar = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//input[@placeholder='Enter an address, neighborhood, city, or ZIP code']"
        )
      ),
      20000
    );

    await searchBar.sendKeys(11203);

    await searchBar.sendKeys(Key.RETURN);

    // Ensure the search bar is visible and clickable
    await driver.wait(until.elementIsVisible(searchBar), 10000);

    await searchBar.click();
  } catch (error) {
    console.error("The error is: ", error);
  } finally {
    await driver.sleep(30000);
    await driver.quit();
  }
})();
