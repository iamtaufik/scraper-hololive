const axios = require('axios');
const cheerio = require('cheerio');

const getTalent = async (req, res) => {
  const url = 'https://hololive.hololivepro.com/en/talents';
  const { name } = req.params;
  try {
    const result = await axios.get(`${url}/${name}`);

    const html = result.data;
    const $ = cheerio.load(html);

    const enTalentName = $('.right_box > div > h1');
    const jpTalentName = $('.right_box > div > h1 > span');
    const talentSypnosis = $('.right_box > div > .txt');
    const talentSocialMedia = $('ul.t_sns > li > a');
    const talentImage = $('#talent_figure > figure > img');
    const talentData1 = $('dl > dt');
    const talentData2 = $('dl > dd');

    let index = [];

    enTalentName.each(function () {
      let enName = $(this)
        .text()
        .trim()
        .replace(/([^A-Z\s\+\[\]])+/gi, '');
      let jpName = $(jpTalentName).text().trim();
      let sypnosis = $(talentSypnosis)
        .text()
        .trim()
        .replace(/([\n])+/gi, ' ');
      let image = $(talentImage).attr('src');

      let tempSocialMedia = [];

      talentSocialMedia.each(function (val, i) {
        console.log(i);
        let key = $(this)
          .text()
          .toLowerCase()
          .replace(/([ ])+/gi, '_');
        let value = $(this).attr('href');

        let obj = {};
        obj[key] = value;
        tempSocialMedia.push(obj);
      });

      let talentData = [];

      for (let i = 0; i < talentData1.length; i++) {
        let key = $(talentData1[i])
          .text()
          .trim()
          .toLowerCase()
          .replace(/([ ])+/gi, '_');
        let value = $(talentData2[i])
          .text()
          .trim()
          .replace(/([\n])+/gi, ' ');

        let obj = {};
        obj[key] = value;
        talentData.push(obj);
      }

      index.push({
        englishName: enName,
        japaneseName: jpName,
        sypnosis,
        social_media: tempSocialMedia,
        image,
        talentData,
      });
    });

    res.status(200).json({ status: 'OK', code: '200', data: index });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = getTalent;
