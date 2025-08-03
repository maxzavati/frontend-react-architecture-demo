import MarkdownIt from 'markdown-it';

export function parseMarkdown(markdown: string): string {
  const md = MarkdownIt({
    html: true,
  });
  return md.render(markdown);
}
