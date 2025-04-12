
import { AlertTriangle, Check, Info, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AdCard from './AdCard';

interface AlertProps {
  children: React.ReactNode;
  title?: string;
  type?: 'default' | 'success' | 'error' | 'warning' | 'info';
}

const CustomAlert = ({ children, title, type = 'default' }: AlertProps) => {
  const icons = {
    default: null,
    success: <Check className="h-4 w-4" />,
    error: <X className="h-4 w-4" />,
    warning: <AlertTriangle className="h-4 w-4" />,
    info: <Info className="h-4 w-4" />
  };
  
  const variants = {
    default: 'default',
    success: 'default',
    error: 'destructive',
    warning: 'default',
    info: 'default'
  };
  
  return (
    <Alert variant={variants[type] as any}>
      {icons[type] && <div className="mr-2">{icons[type]}</div>}
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
};

interface ImageProps {
  src: string;
  alt: string;
  caption?: string;
}

const CustomImage = ({ src, alt, caption }: ImageProps) => {
  return (
    <figure className="my-8">
      <img
        src={src}
        alt={alt}
        className="rounded-lg mx-auto shadow-md"
      />
      {caption && (
        <figcaption className="text-center text-sm text-muted-foreground mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

interface CodeBlockProps {
  children: React.ReactNode;
  language?: string;
}

const CodeBlock = ({ children, language }: CodeBlockProps) => {
  return (
    <div className="relative">
      {language && (
        <div className="absolute right-4 top-2 text-xs text-muted-foreground px-2 py-1 rounded bg-background/50">
          {language}
        </div>
      )}
      <pre className="bg-muted p-4 rounded-lg my-6 overflow-x-auto">
        <code className="text-sm">{children}</code>
      </pre>
    </div>
  );
};

interface QuoteProps {
  children: React.ReactNode;
  author?: string;
}

const Quote = ({ children, author }: QuoteProps) => {
  return (
    <blockquote className="border-l-4 border-primary/20 pl-4 italic my-6">
      {children}
      {author && (
        <footer className="text-right text-sm text-muted-foreground mt-2">
          — {author}
        </footer>
      )}
    </blockquote>
  );
};

const GoogleAd = ({ slot, client }: { slot?: string; client?: string }) => {
  return <AdCard type="google" slot={slot} client={client} />;
};

const AmazonAd = ({ title, productId }: { title?: string; productId?: string }) => {
  return <AdCard type="amazon" title={title} productId={productId} />;
};

export const MDXComponents = {
  Alert: CustomAlert,
  Image: CustomImage,
  CodeBlock,
  Quote,
  GoogleAd,
  AmazonAd,
};

export default MDXComponents;
