import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MDXComponents from '@/components/MDXComponents';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, BookOpen, Calendar, Clock, Share2, Tag as TagIcon } from 'lucide-react';
import { toast } from "sonner";
import AdCard from '@/components/AdCard';
import { parseMarkdown, processMDXComponents } from '@/lib/mdx';

const MOCK_POST = {
  _id: '1',
  slug: 'getting-started-with-nextjs-and-mdx',
  title: 'Getting Started with Next.js and MDX: A Comprehensive Guide',
  excerpt: 'Learn how to build a modern blog with Next.js and MDX. This guide covers everything from setup to deployment.',
  coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29kaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80',
  date: '2025-04-10',
  updatedAt: '2025-04-12',
  tags: ['Next.js', 'MDX', 'Tutorial'],
  readingTime: '8 min read',
  content: `
# Getting Started with Next.js and MDX

Next.js is a powerful framework for building React applications with server-side rendering, static site generation, and more. When combined with MDX, it becomes an excellent choice for content-rich websites like blogs.

## What is MDX?

MDX is a format that lets you seamlessly write JSX in your Markdown documents. You can import components, such as interactive charts or alerts, and embed them within your content.

<Alert title="Note" type="info">
  This is an example of an MDX component in action. You can create custom components like this one to enhance your content.
</Alert>

## Setting Up Your Next.js Project

Let's start by creating a new Next.js project:

<CodeBlock language="bash">
npx create-next-app my-mdx-blog
cd my-mdx-blog
</CodeBlock>

Now, let's install the necessary packages for working with MDX:

<CodeBlock language="bash">
npm install @next/mdx @mdx-js/loader @mdx-js/react
</CodeBlock>

## Configuring Next.js for MDX

Next, you'll need to configure your Next.js project to handle MDX files. Create or update your \`next.config.js\`:

<CodeBlock language="javascript">
const withMDX = require('@next/mdx')({
  extension: /\\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: '@mdx-js/react',
  },
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
})
</CodeBlock>

<GoogleAd slot="123456" />

## Creating Your First MDX Post

Now you can create MDX files in your pages directory. Let's create a simple blog post:

<CodeBlock language="markdown">
---
title: My First MDX Post
date: '2025-04-10'
tags: ['Next.js', 'MDX']
---

# Hello, MDX!

This is my first blog post written in MDX.

<CustomComponent prop="value" />
</CodeBlock>

## Styling Your MDX Content

You'll want to style your MDX content to make it look great. You can use Tailwind CSS, CSS modules, or any other styling approach you prefer.

<Quote author="Sarah Johnson, Web Developer">
  MDX bridges the gap between writing content and building interactive components, allowing content creators to utilize the full power of React.
</Quote>

## Adding Interactive Components

One of the major benefits of MDX is the ability to include interactive components:

<CodeBlock language="jsx">
const InteractiveChart = () => {
  const [data, setData] = useState([...]);
  
  return <Chart data={data} />;
}

export default InteractiveChart;
</CodeBlock>

<AmazonAd title="Next.js in Action" productId="B09123XYZ" />

## Conclusion

With Next.js and MDX, you have a powerful combination for building modern content-driven websites. The ability to mix Markdown with React components gives you the best of both worlds: ease of writing content and the flexibility of React.

In future tutorials, we'll explore more advanced techniques for working with MDX, such as creating custom components, adding frontmatter, and optimizing performance.

<Image 
  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97" 
  alt="Coding on a laptop"
  caption="Start your Next.js and MDX journey today"
/>
  `,
  author: {
    name: 'Jane Smith',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&q=80',
    bio: 'Frontend Developer and Technical Writer. Passionate about creating clean, accessible, and performant web applications.'
  }
};

const RELATED_POSTS = [
  {
    _id: '2',
    slug: 'mastering-tailwind-css',
    title: 'Mastering Tailwind CSS: Tips and Tricks for Efficient Styling',
    excerpt: 'Discover advanced techniques to get the most out of Tailwind CSS in your web development projects.',
    coverImage: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvZGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80',
    date: '2025-04-05',
    tags: ['CSS', 'Tailwind', 'Styling'],
    readingTime: '6 min read'
  },
  {
    _id: '3',
    slug: 'monetizing-your-blog',
    title: 'Monetizing Your Blog: Effective Strategies for 2025',
    excerpt: 'Explore various ways to monetize your blog content effectively while maintaining a great user experience.',
    coverImage: 'https://images.unsplash.com/photo-1586892478025-2b5472316f22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vbmV5fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80',
    date: '2025-03-28',
    tags: ['Monetization', 'AdSense', 'Affiliate'],
    readingTime: '10 min read'
  }
];

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<typeof MOCK_POST | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<typeof RELATED_POSTS>([]);
  const [processedContent, setProcessedContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        // In a real application, fetch from API
        // const response = await fetch(`/api/posts/${slug}`);
        // const data = await response.json();
        
        // For now, using mock data
        const mockPost = MOCK_POST;
        setPost(mockPost);
        setRelatedPosts(RELATED_POSTS);
        
        // Process the MDX content
        if (mockPost.content) {
          // First process any MDX components
          const contentWithComponents = processMDXComponents(
            mockPost.content, 
            MDXComponents
          );
          
          // Then convert the markdown to HTML
          const htmlContent = await parseMarkdown(contentWithComponents);
          setProcessedContent(htmlContent);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        toast.error("Failed to load the article");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPost();
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [slug]);
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };
  
  if (isLoading || !post) {
    return (
      <>
        <Header />
        <main className="flex-1 container py-12">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-xl font-medium mb-2">Loading article...</h2>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Article Hero */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/blog" className="flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to all articles
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Badge key={tag} className="flex items-center gap-1">
                    <TagIcon className="h-3 w-3" />
                    <Link to={`/tags/${tag.toLowerCase()}`}>{tag}</Link>
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {post.title}
              </h1>
              <div className="flex items-center text-muted-foreground mb-6">
                <div className="flex items-center gap-2 mr-6">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={new Date(post.date).toISOString()}>
                    {formatDate(post.date)}
                  </time>
                </div>
                <div className="flex items-center gap-2 mr-6">
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Article</span>
                </div>
              </div>
              {post.updatedAt && post.updatedAt !== post.date && (
                <div className="text-sm text-muted-foreground mb-6">
                  Last updated on {formatDate(post.updatedAt)}
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Article Cover Image */}
        {post.coverImage && (
          <div className="container py-6">
            <div className="max-w-4xl mx-auto">
              <div className="aspect-video overflow-hidden rounded-lg shadow-md">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Article Content */}
        <article className="container py-8">
          <div className="max-w-3xl mx-auto">
            {/* Author */}
            {post.author && (
              <div className="flex items-center mb-8 p-4 rounded-lg border bg-card/50">
                <div className="mr-4">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div>
                  <div className="font-medium">{post.author.name}</div>
                  <div className="text-sm text-muted-foreground">{post.author.bio}</div>
                </div>
              </div>
            )}
            
            {/* Content */}
            <div className="prose max-w-none dark:prose-invert prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-10 prose-p:text-base prose-pre:bg-muted prose-pre:text-sm">
              <div dangerouslySetInnerHTML={{ __html: processedContent }} />
            </div>
            
            {/* Share Button */}
            <div className="mt-12 flex justify-center">
              <Button
                onClick={handleShare}
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share this article
              </Button>
            </div>
          </div>
        </article>
        
        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="py-12 bg-muted/30">
            <div className="container">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-8">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost._id} to={`/blog/${relatedPost.slug}`} className="group">
                      <div className="h-full border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow">
                        {relatedPost.coverImage && (
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={relatedPost.coverImage}
                              alt={relatedPost.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {relatedPost.title}
                          </h3>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <time dateTime={new Date(relatedPost.date).toISOString()}>
                              {formatDate(relatedPost.date)}
                            </time>
                            <span>•</span>
                            <span>{relatedPost.readingTime}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default PostDetail;
