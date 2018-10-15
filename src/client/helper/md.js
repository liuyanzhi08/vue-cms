import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';

const md = new MarkdownIt();
const parse = source => md.render(sanitizeHtml(source));

export default {
  parse,
};
