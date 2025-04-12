
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const MOCK_POSTS = [
  {
    _id: '1',
    slug: 'getting-started-with-nextjs-and-mdx',
    title: 'Getting Started with Next.js and MDX: A Comprehensive Guide',
    excerpt: 'Learn how to build a modern blog with Next.js and MDX. This guide covers everything from setup to deployment.',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29kaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80',
    date: '2025-04-10',
    tags: ['Next.js', 'MDX', 'Tutorial'],
    readingTime: '8 min read'
  },
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
  },
  {
    _id: '4',
    slug: 'seo-optimization-for-blogs',
    title: 'SEO Optimization for Blogs: A Step-by-Step Guide',
    excerpt: 'Learn how to optimize your blog posts for search engines to increase organic traffic and visibility.',
    coverImage: 'https://images.unsplash.com/photo-1571867424488-4565932edb41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNlb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=80',
    date: '2025-03-20',
    tags: ['SEO', 'Marketing', 'Traffic'],
    readingTime: '12 min read'
  },
  {
    _id: '5',
    slug: 'creating-engaging-content',
    title: 'Creating Engaging Content That Keeps Readers Coming Back',
    excerpt: 'Discover strategies for creating compelling blog content that engages readers and builds a loyal audience.',
    coverImage: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvbnRlbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80',
    date: '2025-03-15',
    tags: ['Content', 'Writing', 'Engagement'],
    readingTime: '7 min read'
  }
];

const POPULAR_TAGS = [
  'Next.js', 'MDX', 'Tailwind', 'SEO', 'Monetization', 'Content', 'Writing', 'Tutorial'
];

const Index = () => {
  const [featuredPost, setFeaturedPost] = useState<typeof MOCK_POSTS[0] | null>(null);
  const [recentPosts, setRecentPosts] = useState<typeof MOCK_POSTS>([]);
  
  useEffect(() => {
    // In a real application, we would fetch posts from the API
    setFeaturedPost(MOCK_POSTS[0]);
    setRecentPosts(MOCK_POSTS.slice(1, 5));
  }, []);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Share Knowledge.{" "}
                <span className="text-primary">Build Authority.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Welcome to BlogMDX, a modern blog platform built with Next.js, MDX, and MongoDB. Start reading our latest articles or search for topics that interest you.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" asChild>
                  <Link to="/blog">Browse Articles</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/about">About Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-12">
            <div className="container">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold">Featured Article</h2>
              </div>
              <PostCard post={featuredPost} featured />
            </div>
          </section>
        )}
        
        {/* Recent Posts */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Recent Articles</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/blog" className="flex items-center">
                  View all <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Popular Tags */}
        <section className="py-12">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Popular Topics</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/tags" className="flex items-center">
                  View all <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-3">
              {POPULAR_TAGS.map((tag) => (
                <Button key={tag} variant="outline" size="sm" asChild>
                  <Link to={`/tags/${tag.toLowerCase()}`}>{tag}</Link>
                </Button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to our Newsletter</h2>
              <p className="text-muted-foreground mb-6">
                Get the latest articles, tutorials, and updates delivered straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
