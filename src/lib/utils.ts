
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export function truncate(text: string, length: number) {
  if (text.length <= length) {
    return text;
  }
  return text.slice(0, length) + '...';
}

/**
 * Helper to create classNames for MDX components
 */
export function mdxComponentClass(componentName: string, additionalClasses?: string) {
  return cn(`mdx-component mdx-${componentName.toLowerCase()}`, additionalClasses);
}

/**
 * Extracts props from a string of HTML attributes
 */
export function extractProps(propsString: string): Record<string, string> {
  const props: Record<string, string> = {};
  const regex = /(\w+)="([^"]*)"/g;
  let match;
  
  while ((match = regex.exec(propsString)) !== null) {
    props[match[1]] = match[2];
  }
  
  return props;
}
