import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';

const md = new MarkdownIt();

export default {
  name: 'md',
  handler: source => md.render(DOMPurify.sanitize(source)),
};
