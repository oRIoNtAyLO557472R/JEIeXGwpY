// 代码生成时间: 2025-09-08 23:11:32
const axios = require('axios');
const cheerio = require('cheerio');

/**
 * WebScaper class to fetch and parse web content.
 */
class WebScaper {
  constructor(url) {
    this.url = url;
  }

  /**
   * Fetches the content of the webpage.
   * @returns {Promise} Resolves with the HTML content of the webpage.
   */
  async fetchContent() {
    try {
      const response = await axios.get(this.url);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch content:', error.message);
      throw error;
    }
  }

  /**
   * Parses the HTML content using Cheerio.
   * @param {string} html - The HTML content of the webpage.
   * @returns {object} The Cheerio object for parsing.
   */
  parseContent(html) {
    return cheerio.load(html);
  }

  /**
   * Extracts data from the webpage based on a selector.
   * @param {string} selector - The CSS selector to extract data from.
   * @returns {Promise} Resolves with the extracted data.
   */
  async extractData(selector) {
    try {
      const html = await this.fetchContent();
      const $ = this.parseContent(html);
      return $(selector).text();
    } catch (error) {
      console.error('Failed to extract data:', error.message);
      throw error;
    }
  }
}

// Usage example:
(async () => {
  const scraper = new WebScaper('https://example.com');
  try {
    const data = await scraper.extractData('h1');
    console.log('Extracted data:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();