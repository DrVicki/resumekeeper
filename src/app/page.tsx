import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Rocket, Sparkles } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <FileText className="w-6 h-6" />
            <span>ResumeKeeper</span>
          </Link>
          <Button asChild>
            <Link href="/profile">Go to App</Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-32">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter mb-4">
            Craft Your Professional Story
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            ResumeKeeper helps you build, manage, and publish a stunning online portfolio and resume with ease. Let our AI-powered tools help you shine.
          </p>
          <Button size="lg" asChild>
            <Link href="/profile">
              <Sparkles className="mr-2 h-5 w-5" />
              Start Building for Free
            </Link>
          </Button>
        </section>

        <section className="bg-muted/50 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <Card>
                <CardContent className="p-8">
                  <div className="p-4 bg-primary/10 rounded-full inline-block mb-4">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold font-headline mb-2">AI-Powered Assistance</h3>
                  <p className="text-muted-foreground">
                    Generate compelling "About Me" sections and bios effortlessly with our integrated AI writer.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <div className="p-4 bg-primary/10 rounded-full inline-block mb-4">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold font-headline mb-2">Complete Profile Control</h3>
                  <p className="text-muted-foreground">
                    Easily manage your experience, education, and projects with our intuitive interface.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-8">
                  <div className="p-4 bg-primary/10 rounded-full inline-block mb-4">
                    <Rocket className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold font-headline mb-2">Publish &amp; Impress</h3>
                  <p className="text-muted-foreground">
                    Preview and publish a clean, professional online portfolio to share with the world.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} ResumeKeeper. All rights reserved.</p>
      </footer>
    </div>
  );
}
