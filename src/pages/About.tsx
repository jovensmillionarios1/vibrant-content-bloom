
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdCard from '@/components/AdCard';

const About = () => {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center">
                About BlogMDX
              </h1>
              <p className="text-lg text-muted-foreground text-center">
                A modern blog platform built with Next.js, MDX, and MongoDB.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container">
            <div className="max-w-3xl mx-auto prose">
              <h2>Our Mission</h2>
              <p>
                Welcome to BlogMDX, where we aim to provide high-quality content that educates, inspires, and helps developers and content creators build better web experiences.
              </p>
              <p>
                We believe that content creation should be both powerful and flexible, which is why we've built this platform using Next.js, MDX, and MongoDB, allowing us to combine the simplicity of Markdown with the power of React components.
              </p>
              
              <h2>What We Cover</h2>
              <p>
                Our blog focuses on a variety of topics, including:
              </p>
              <ul>
                <li>Web development best practices</li>
                <li>Modern JavaScript frameworks and libraries</li>
                <li>Content management strategies</li>
                <li>SEO and content optimization</li>
                <li>Monetization strategies for blogs and websites</li>
              </ul>
              
              <AdCard type="google" />
              
              <h2>Our Technology Stack</h2>
              <p>
                This blog is built using the following technologies:
              </p>
              <ul>
                <li><strong>Next.js 14</strong> - For server-side rendering, static site generation, and API routes</li>
                <li><strong>TypeScript</strong> - For type safety and better developer experience</li>
                <li><strong>MDX</strong> - For writing content with embedded React components</li>
                <li><strong>MongoDB</strong> - For storing blog posts and metadata</li>
                <li><strong>Tailwind CSS</strong> - For styling</li>
                <li><strong>shadcn/ui</strong> - For beautiful, accessible UI components</li>
              </ul>
              
              <h2>Monetization</h2>
              <p>
                This blog incorporates monetization through:
              </p>
              <ul>
                <li>Google AdSense - Non-intrusive ads placed within content</li>
                <li>Amazon Associates Program - Affiliate product recommendations related to article content</li>
              </ul>
              
              <AdCard 
                type="amazon" 
                title="Build Your Own Blog Platform" 
                productId="B09123XYZ" 
              />
              
              <h2>Contact Us</h2>
              <p>
                We'd love to hear from you! If you have any questions, feedback, or would like to contribute to the blog, please reach out to us at <a href="mailto:hello@blogmdx.com">hello@blogmdx.com</a>.
              </p>
              
              <h2>Open Source</h2>
              <p>
                This blog platform is open source and available on <a href="https://github.com/blogmdx/blogmdx" target="_blank" rel="noopener noreferrer">GitHub</a>. Feel free to fork it, use it for your own projects, or contribute to its development.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
