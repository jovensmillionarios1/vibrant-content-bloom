
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';

/**
 * Parse markdown content to HTML
 * @param content The markdown content to parse
 * @returns Parsed HTML content
 */
export async function parseMarkdown(content: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm) // GitHub-flavored markdown
    .use(remarkHtml, { sanitize: false }) // Convert to HTML, don't sanitize to allow custom elements
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
  
  // Process code blocks with syntax highlighting
  processedContent = processedContent.replace(
    /<CodeBlock language="([^"]*)">(.*?)<\/CodeBlock>/gs,
    (match, language, code) => {
      return `<div class="code-block-wrapper">
                <div class="code-block-header">${language}</div>
                <pre class="language-${language}"><code class="language-${language}">${code}</code></pre>
              </div>`;
    }
  );
  
  // Process ads specifically
  processedContent = processedContent.replace(
    /<(GoogleAd|AmazonAd)([^>]*)>(.*?)<\/(GoogleAd|AmazonAd)>/gs,
    (match, adType, attributes, content, closingTag) => {
      // Extract ad attributes from the string
      const props: Record<string, string> = {};
      
      const attrMatches = attributes.matchAll(/(\w+)="([^"]*)"/g);
      for (const attrMatch of Array.from(attrMatches)) {
        props[attrMatch[1]] = attrMatch[2];
      }
      
      if (adType === 'GoogleAd') {
        return `<div class="ad-container google-ad">
                  <div class="ad-label">Advertisement</div>
                  <div class="ad-content" data-slot="${props.slot || ''}" data-client="${props.client || ''}">
                    [Google AdSense Ad]
                  </div>
                </div>`;
      } else if (adType === 'AmazonAd') {
        return `<div class="ad-container amazon-ad">
                  <div class="ad-label">Amazon Affiliate</div>
                  <div class="ad-content" data-product-id="${props.productId || ''}" data-title="${props.title || 'Recommended Product'}">
                    <div class="ad-product-info">
                      <div class="ad-product-image">[Product Image]</div>
                      <div class="ad-product-title">${props.title || 'Recommended Product'}</div>
                      <a href="https://amazon.com/dp/${props.productId || 'B0EXAMPLE'}" target="_blank" 
                         rel="noopener noreferrer sponsored" class="ad-product-link">View on Amazon</a>
                    </div>
                  </div>
                </div>`;
      }
      
      return match; // return original if not handled
    }
  );
  
  // Replace other component tags like <Alert> with their HTML representation
  Object.keys(components).forEach(componentName => {
    if (componentName !== 'GoogleAd' && componentName !== 'AmazonAd' && componentName !== 'CodeBlock') {
      const regex = new RegExp(`<${componentName}([^>]*)>(.*?)<\/${componentName}>`, 'gs');
      processedContent = processedContent.replace(regex, (match, props, children) => {
        // Parse props if needed
        const className = `mdx-component mdx-${componentName.toLowerCase()}`;
        return `<div class="${className}">${children}</div>`;
      });
    }
  });
  
  return processedContent;
}
