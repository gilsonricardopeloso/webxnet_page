import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Services from "../components/Services"
import About from "../components/About"
import ContactForm from "../components/Contact"
import Footer from "../components/Footer"
import Diagnostic from "../components/Diagnostic"

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Diagnostic />
      <ContactForm />
      <Footer />
    </div>
  )
}

export default Index
