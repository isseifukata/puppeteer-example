import puppeteer = require("puppeteer")

const urls = [
  "https://www.host2.jp/shop/aidion/tsubasa/index.html",
  "https://www.host2.jp/shop/aidion/minato/index.html",
  "https://www.host2.jp/shop/aidion/shoya/index.html",
]

type Birthday = {
  area: string
  shop: string
  name: string
  birthday: string
}

const main = async () => {
  const browser = await puppeteer.launch()

  for (const url of urls) {
    const page = await browser.newPage()
    await page.goto(url)
    await page.setViewport({ width: 1920, height: 1080 })
    const pageTitle = await page.title()

    const area = await page
      .$(".area")
      .then((data) => data?.getProperty("textContent"))
      .then((data) => data?.jsonValue())

    const shop = await page
      .$(".tit")
      .then((data) => data?.getProperty("textContent"))
      .then((data) => data?.jsonValue())

    const name = await page
      .$(".staff-name")
      .then((data) => data?.getProperty("textContent"))
      .then((data) => data?.jsonValue())

    const birthday = await page
      .$(".cmt")
      .then((data) => data?.getProperty("textContent"))
      .then((data) => data?.jsonValue())

    console.log({
      area,
      shop,
      name,
      birthday,
    })

    await page.screenshot({ path: `screenshot/${pageTitle}.png` })
  }

  await browser.close()
}

main()
