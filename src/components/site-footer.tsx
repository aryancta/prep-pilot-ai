import Link from "next/link"
import { Github, Mail, Heart } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">PP</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                PrepPilot AI
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Transform any resume into a personalized interview prep plan in minutes.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/onboarding" className="hover:text-foreground transition-colors">Try Demo</Link></li>
              <li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li>
              <li><Link href="/history" className="hover:text-foreground transition-colors">Your Sessions</Link></li>
              <li><Link href="/settings" className="hover:text-foreground transition-colors">Settings</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><span className="cursor-not-allowed opacity-60">Documentation</span></li>
              <li><span className="cursor-not-allowed opacity-60">API Reference</span></li>
              <li><span className="cursor-not-allowed opacity-60">Help Center</span></li>
              <li><span className="cursor-not-allowed opacity-60">Community</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="mailto:aryancta@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>for the hackathon by Aryan Choudhary</span>
          </div>
          <div className="flex space-x-4 text-sm text-muted-foreground mt-4 md:mt-0">
            <span>© 2024 PrepPilot AI</span>
            <span>•</span>
            <span>Made with MeDo</span>
          </div>
        </div>
      </div>
    </footer>
  )
}