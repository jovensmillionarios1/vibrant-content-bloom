
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';

const NotFound = () => {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="py-24 md:py-32">
          <div className="container">
            <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <div className="rounded-full bg-muted p-6 mb-8">
                <FileQuestion className="h-12 w-12 text-muted-foreground" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">404</h1>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h2>
              <p className="text-muted-foreground mb-8">
                The page you're looking for doesn't exist or has been moved.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild>
                  <Link to="/">Go to Homepage</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/blog">Browse Articles</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
