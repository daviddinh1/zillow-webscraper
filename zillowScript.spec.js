const { By, Key, Builder, Browser, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function setupDriver() {
  let options = new chrome.Options();
  options.addArguments(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36"
  );

  // options.addArguments("--headless=new");

  let driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();

  return driver;
}

async function zillowScript() {
  const driver = await setupDriver();

  try {
    await driver.get("https://www.zillow.com");

    //how to enter stuff tired of capcha tryna see if it can get house data
    const searchBar = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//input[@placeholder='Enter an address, neighborhood, city, or ZIP code']"
        )
      ),
      20000
    );
    await driver.wait(until.elementIsVisible(searchBar), 20000);
    await searchBar.click();

    await driver.sleep(10000);

    await searchBar.sendKeys(11203);

    await driver.sleep(10000);

    await searchBar.sendKeys(Key.RETURN);

    await driver.sleep(10000);

    //find what skip this button is and then click it and see what happens when the page pops up
  } catch (error) {
    console.error("The error is: ", error);
  } finally {
    await driver.quit();
  }
}

(async function runScript() {
  await zillowScript();
})();
