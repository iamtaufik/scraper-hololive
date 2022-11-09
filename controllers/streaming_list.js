const axios = require('axios');
const cheerio = require('cheerio');

const getAllStream = async (req, res) => {
  const url = 'https://schedule.hololive.tv/api/list';
  try {
    const result = await axios.get(url);

    res.status(200).json({ status: 'OK', code: '200', data: result.data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = getAllStream;
