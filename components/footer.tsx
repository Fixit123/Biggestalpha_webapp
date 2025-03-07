import Link from "next/link"
import { Facebook, Twitter, Instagram } from "lucide-react"
import Image from "next/image"

const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold">Biggest Alpha</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              WE'LL TAKE CARE OF YOU AND YOUR GADGETS.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/book-repair">Book Repair</Link></li>
              <li><Link href="/membership">Join Membership</Link></li>
              <li><Link href="/repair-tracker">Track Repair</Link></li>
              <li><Link href="/contact-reviews#contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Business Hours */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Business Hours</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Monday - Friday: 9AM - 6PM</li>
              <li>Saturday: 10AM - 4PM</li>
              <li>Sunday: Closed</li>
              <li>Public Holidays: Closed</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>📍 Lagos, Nigeria</li>
              <li>📞 +234 9030168511</li>
              <li>📧 Biggestalpha7@gmail.com</li>
              <li className="flex items-center gap-4 pt-2">
                <Link 
                  href="https://www.facebook.com/share/14a9KYHVir/" 
                  target="_blank" 
                  className="hover:text-primary transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link 
                  href="https://x.com/BiggestAlpha_?t=RKFyWMGeAfBrG2_cWAGeuA&s=09" 
                  target="_blank" 
                  className="hover:text-primary transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link 
                  href="https://www.instagram.com/biggestalpha_?igsh=MXNudmM5ZzV6ajZ2Mw==" 
                  target="_blank" 
                  className="hover:text-primary transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link 
                  href="https://www.tiktok.com/@biggest_alpha?_t=ZM-8u5ux5T7x1Z&_r=1" 
                  target="_blank" 
                  className="hover:text-primary transition-colors"
                >
                  <TikTokIcon />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Biggest Alpha. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

