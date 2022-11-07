const axios = require('axios');
const cheerio = require('cheerio');

const getAllGensList = async (req, res) => {
  const url = 'https://hololive.hololivepro.com/en/talents';
  try {
    const result = await axios.get(url);
    const html = result.data;
    const $ = cheerio.load(html);
    const list = $('section#nav_tag > ul > li > a');

    let index = [];

    list.each(function (value, i) {
      let link = $(this).attr('href');
      let title = $(this).text().trim();

      index.push({
        title,
        link,
      });
    });

    res.status(200).json({
      status: 'OK',
      code: '200',
      data: index,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = getAllGensList;
