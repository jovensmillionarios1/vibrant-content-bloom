
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

/**
 * Parse markdown content to HTML
 * @param content The markdown content to parse
 * @returns Parsed HTML content
 */
export async function parseMarkdown(content: string): Promise<string> {
  const result = await remark()
    .use(gfm) // GitHub-flavored markdown
    .use(html, { sanitize: false }) // Convert to HTML, don't sanitize to allow custom elements
    .process(content);
  
  return result.toString();
}

/**
 * Simple function to replace MDX component syntax with HTML components
 * This is a basic implementation - a real MDX parser would be more complex
 * @param content Content with MDX components
 * @returns Content with components transformed to HTML
 */
export function processMDXComponents(content: string, components: Record<string, any>): string {
  let processedContent = content;
  
  // Replace component tags like <Alert> with their HTML representation
  Object.keys(components).forEach(componentName => {
    const regex = new RegExp(`<${componentName}([^>]*)>(.*?)<\/${componentName}>`, 'gs');
    processedContent = processedContent.replace(regex, (match, props, children) => {
      // In a real implementation, you'd parse props and create the component
      return `<div class="mdx-component mdx-${componentName.toLowerCase()}">${children}</div>`;
    });
  });
  
  return processedContent;
}
