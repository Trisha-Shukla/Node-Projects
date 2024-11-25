const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const xlsx = require('xlsx');

const BASE_URL = 'https://www.timesjobs.com/candidate/job-search.html?searchType=Home_Search&from=submit&asKey=OFF&txtKeywords=&cboPresFuncArea=35';

const scrapeJobs = async () => {
  const jobData = [];

  try {
    // Step 1: Fetch the main page
    const { data: mainPageHtml } = await axios.get(BASE_URL);
    const $ = cheerio.load(mainPageHtml);

    // Step 2: Extract links to individual job pages
    const jobLinks = [];
    $('.posoverlay_srp').each((_, element) => {
      let jobLink = $(element).attr('href');
      if (!jobLink.startsWith('http')) {
        jobLink = `https://www.timesjobs.com${jobLink}`; // Prepend base URL for relative links
      }
      jobLinks.push(jobLink);

    });

    // Step 3: Scrape individual job pages for details
    for (const link of jobLinks) {
      try {
        const { data: jobPageHtml } = await axios.get(link);
        const $ = cheerio.load(jobPageHtml);

        const jobTitle = $('h1.jd-job-title').text().trim();
        const companyName = $('.d-flex-align-item h2 a').text().trim();
        const location = $('.job-location-trunicate').text().replace('Location: ', '').trim();
        const jobType = $('li:contains("Job Function:") span.basic-info-dtl').text().replace('Job Type: ', '').trim();
        const postedDate = $('.posted-days').text().trim();
        const jobDescription =$('#applyFlowHideDetails_4')
        .contents() // Get all child nodes
        .filter((_, element) => element.type === 'text') // Filter out only text nodes
        .text()
        .trim();

        jobData.push({
          jobTitle,
          companyName,
          location,
          jobType,
          postedDate,
          jobDescription,
        });

        console.log(`Scraped data for job: ${jobTitle}`);
      } catch (err) {
        console.error(`Failed to fetch details from ${link}`, err);
      }
    }

    // Step 4: Save data to a JSON file
    fs.writeFileSync('jobs.json', JSON.stringify(jobData, null, 2));
    console.log('Data saved to jobs.json');

    // Step 5: Save data to an Excel file
    const workbook = xlsx.utils.book_new();
    const sheet = xlsx.utils.json_to_sheet(jobData);
    xlsx.utils.book_append_sheet(workbook, sheet, 'Jobs');
    xlsx.writeFile(workbook, 'jobs.xlsx');
    console.log('Data saved to jobs.xlsx');
  } catch (err) {
    console.error('Error scraping jobs:', err);
  }
};

scrapeJobs();
