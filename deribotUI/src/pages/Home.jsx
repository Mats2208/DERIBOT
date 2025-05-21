import Hero from "../components/Hero"
import Features from "../components/Features"
import CallToAction from "../components/CallToAction"
import Footer from "../components/Footer"

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Features />
      <CallToAction />
      <Footer />
    </div>
  )
}

export default Home
