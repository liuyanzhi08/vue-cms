import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';

const md = new MarkdownIt({ html: true });
const parse = source => md.render(source);
// const parse = source => md.render(sanitizeHtml(source));
// todo fix security problem
export default {
  parse,
};
