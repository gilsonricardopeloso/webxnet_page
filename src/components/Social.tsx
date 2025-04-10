import { Facebook, Instagram, Linkedin, X } from "lucide-react"
import { Button } from "./ui/button"

const Social = () => {
  const socialLinks = [
    {
      icon: Facebook,
      href: "https://facebook.com/webxnetBR",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://instagram.com",
      label: "Instagram",
    },
    {
      icon: X,
      href: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/gilson-peloso/",
      label: "LinkedIn",
    },
  ]

  return (
    <div className="flex items-center gap-4 justify-center md:justify-start">
      {socialLinks.map((social) => {
        const Icon = social.icon
        return (
          <Button
            key={social.label}
            variant="ghost"
            size="icon"
            className="hover:text-primary transition-colors"
            asChild
          >
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
            >
              <Icon className="h-5 w-5" size={20} />
            </a>
          </Button>
        )
      })}
    </div>
  )
}

export default Social
