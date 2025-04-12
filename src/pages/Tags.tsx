
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Tag as TagIcon } from 'lucide-react';

// Mock data for tags and posts
const MOCK_TAGS = [
  { name: 'Next.js', count: 8 },
  { name: 'MDX', count: 6 },
  { name: 'Tailwind', count: 12 },
  { name: 'SEO', count: 5 },
  { name: 'Monetization', count: 4 },
  { name: 'Content', count: 7 },
  { name: 'Writing', count: 5 },
  { name: 'Tutorial', count: 9 },
  { name: 'CSS', count: 11 },
  { name: 'Design', count: 8 },
  { name: 'Performance', count: 6 },
  { name: 'React', count: 14 },
  { name: 'JavaScript', count: 15 },
  { name: 'TypeScript', count: 7 },
  { name: 'Marketing', count: 4 }
];

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
  }
];

const Tags = () => {
  const { tag } = useParams<{ tag?: string }>();
  const [tags, setTags] = useState(MOCK_TAGS);
  const [posts, setPosts] = useState<typeof MOCK_POSTS>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // In a real application, we would fetch tags from the API
    setTags(MOCK_TAGS);
  }, []);
  
  useEffect(() => {
    if (tag) {
      setIsLoading(true);
      // In a real application, we would fetch posts by tag from the API
      // For now, we'll filter the mock data
      const filteredPosts = MOCK_POSTS.filter(
        post => post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
      );
      
      // Simulate API delay
      setTimeout(() => {
        setPosts(filteredPosts);
        setIsLoading(false);
      }, 500);
    } else {
      setPosts([]);
    }
  }, [tag]);

  // If we're on a tag detail page
  if (tag) {
    return (
      <>
        <Header />
        <main className="flex-1">
          <section className="py-12 md:py-16 bg-muted/30">
            <div className="container">
              <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/tags" className="flex items-center">
                      <ArrowLeft className="mr-2 h-4 w-4" /> All Tags
                    </Link>
                  </Button>
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <TagIcon className="h-6 w-6" />
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                    {tag}
                  </h1>
                </div>
                <p className="text-lg text-muted-foreground">
                  Articles related to {tag}.
                </p>
              </div>
            </div>
          </section>
          
          <section className="py-12">
            <div className="container">
              {isLoading ? (
                <div className="text-center py-12">
                  <h2 className="text-xl font-medium mb-2">Loading articles...</h2>
                </div>
              ) : posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h2 className="text-xl font-medium mb-2">No articles found</h2>
                  <p className="text-muted-foreground">
                    There are no articles with the tag "{tag}".
                  </p>
                  <Button className="mt-4" asChild>
                    <Link to="/blog">Browse all articles</Link>
                  </Button>
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  // Tags index page
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center">
                Tags
              </h1>
              <p className="text-lg text-muted-foreground text-center mb-8">
                Browse articles by topic to find exactly what you're looking for.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <Link key={tag.name} to={`/tags/${tag.name.toLowerCase()}`}>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 mb-4"
                    >
                      <TagIcon className="h-4 w-4" />
                      <span>{tag.name}</span>
                      <span className="ml-1 bg-muted text-muted-foreground text-xs py-0.5 px-2 rounded-full">
                        {tag.count}
                      </span>
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Tags;
