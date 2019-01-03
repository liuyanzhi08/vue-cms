import cheerio from 'cheerio';
import md from './md';

const summary = (mdStr) => {
  const html = md.parse(mdStr);
  const $ = cheerio.load(html);
  const plainText = $.text().replace(/\s+/gi, ' ');
  return plainText.substr(0, 300);
};

export default {
  summary,
};
