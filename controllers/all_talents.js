const axios = require('axios');
const cheerio = require('cheerio');

const getAllTalents = async (req, res) => {
  const url = 'https://hololive.hololivepro.com/en/talents';

  try {
    const result = await axios.get(url);
    const html = result.data;
    const $ = cheerio.load(html);
    const enNameList = $('ul.talent_list > li > a > h3');
    const japanNameList = $('ul.talent_list > li > a > h3 > span');
    const imageList = $('ul.talent_list > li > a > figure > img');

    let index = [];
    let i = 0;
    enNameList.each(function () {
      let enName = $(this)
        .text()
        .trim()
        .replace(/([^A-Z\s\+\[\]])+/gi, '');

      let jpName = $(japanNameList[i]).text().trim();
      let image = $(imageList[i]).attr('src');

      index.push({
        englishName: enName,
        japanName: jpName,
        image,
      });
      i++;
    });

    res.status(200).json({ status: 'OK', code: '200', data: index });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = getAllTalents;
