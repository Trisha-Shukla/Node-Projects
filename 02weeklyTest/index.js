const puppeteer = require("puppeteer");
const fs = require("fs");
const cheerio = require("cheerio");

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://iplt20.com/stats"); // Replace with the exact URL

  const seasons = ["2020", "2021", "2022", "2023", "2024"]; // Define the seasons
  const categories = [
    "Most Sixes (Innings)",
    "Most Centuries",
    "Orange Cap",
    "Most Fours (Innings)",
    "Most Fifties",
  ]; // Define the categories

  for (const season of seasons) {
    // Step 1: Select the season
    await page.click(".cSBDisplay"); // Open season dropdown
    await page.waitForSelector(".cSBList"); // Wait for the dropdown to appear

    await page.evaluate((season) => {
      const items = Array.from(document.querySelectorAll(".cSBListItems"));
      const target = items.find((item) => item.getAttribute("data-val") === season);
      if (target) target.click();
    }, season);

    // Wait for the page to update after selecting the season
    await new Promise((resolve) => setTimeout(resolve, 2000));


    for (const category of categories) {
      // Step 2: Select the category
      await page.click(".cSBDisplay"); // Open category dropdown
      await page.waitForSelector(".cSBList"); // Wait for the dropdown to appear

      await page.evaluate((category) => {
        const items = Array.from(document.querySelectorAll(".cSBListItemsFilter"));
        const target = items.find((item) => item.innerText.trim() === category);
        // console.log(target);
        
        if (target) target.click();
      }, category);

      // Wait for the page to update after selecting the category
      await new Promise((resolve) => setTimeout(resolve, 2000));


      // Step 3: Scrape the data
      const content = await page.content();
      const $ = cheerio.load(content);

      

      const data = [];
      const rows = $("tr").not(".st-table__head"); // Adjust selector for table rows if needed
      
      
      rows.each((i, elem) => {
        // console.log(elem);
        
        data.push({
          Season: `Season ${season}`,
          Category: category,
          Player: $(elem).find(".st-ply-name").text().trim(),
          Team: $(elem).find(".st-ply-tm-name").text().trim(),
          Stat: $(elem).find(".np-tableruns").text().trim(), // Adjust selector for the stat column
        });
      });

      // Save the data for the season and category
      const fileName = `Season_${season}_${category.replace(/ /g, "_")}.json`;
      fs.writeFileSync(fileName, JSON.stringify(data, null, 2), "utf-8");
      console.log(`Data for ${category} in Season ${season} saved to ${fileName}`);
    }
  }

  await browser.close();
})();
