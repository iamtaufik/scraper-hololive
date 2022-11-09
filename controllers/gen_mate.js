const axios = require('axios');
const cheerio = require('cheerio');

const getGenMate = async (req, res) => {
  const { gen } = req.params;
  const url = `https://hololive.hololivepro.com/en/talents?gp`;
  try {
    const result = await axios.get(`${url}=${gen}`);

    const html = result.data;
    const $ = cheerio.load(html);

    const genMateENNameList = $('ul.talent_list > li > a >h3');
    const genMateJPNameList = $('ul.talent_list > li > a >h3 > span');
    const genMateImageList = $('ul.talent_list > li > a >figure > img');

    let index = [];
    let i = 0;
    genMateENNameList.each(function () {
      let enName = $(this)
        .text()
        .trim()
        .replace(/([^A-Z\s\+\[\]])+/gi, '');
      let jpName = $(genMateJPNameList[i]).text().trim();
      let image = $(genMateImageList[i]).attr('src');

      let obj = {};
      obj['englishName'] = enName;
      obj['japanName'] = jpName;
      obj['image'] = image;
      index.push(obj);
      i++;
    });
    res.status(200).json({ status: 'OK', code: '200', data: index });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = getGenMate;
