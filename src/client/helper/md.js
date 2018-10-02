import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';

const md = new MarkdownIt();
const parse = source => md.render(DOMPurify.sanitize(source));

export default {
  parse,
};
