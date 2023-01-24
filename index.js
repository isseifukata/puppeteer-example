import puppeteer from "puppeteer"

async function run() {
  // Launch a browser instance
  const browser = await puppeteer.launch()

  // Create a new page
  const page = await browser.newPage()

  // Navigate to google.com
  await page.goto("https://www.google.com")

  // Type "SEO" into the search bar
  await page.type("input[name=q]", "SEO")

  // check if the search button exists on the page
  const searchButton = await page.$('input[type="submit"]')
  if (!searchButton) {
    console.log("search button doesn't exist")
    return
  }

  // Check if the search button is visible
  const searchButtonVisible = await page.evaluate(
    (el) => el.offsetParent !== null,
    searchButton
  )
  if (!searchButtonVisible) {
    console.log("search button is not visible")
    return
  }

  // Click the search button
  await searchButton.click()

  // Wait for the search results to load
  await page.waitForNavigation()

  // Get all the search result titles and URLs
  const searchResults = await page.evaluate(() => {
    const results = Array.from(document.querySelectorAll("#rso .g"))
    return results.map((result) => {
      return {
        title: result.querySelector("a h3").innerText,
        url: result.querySelector("a").href,
      }
    })
  })

  // Log the search results to the console
  console.log(searchResults)

  //Take screenshot
  await page.screenshot({ path: "screenshot.png" })

  // Close the browser
  await browser.close()
}

run()
