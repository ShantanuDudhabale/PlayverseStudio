import "../styles/VideoShowcase.css"
import "../styles/Testimonials.css"
import "../styles/content-flywheel.css"

import Container1 from "./Container1"
import Container2 from "./Container2"
import Container3 from "./Container3"
import Container4 from "./Container4"
import VideoShowcase from "./VideoShowcase"
import Testimonials from "./Testimonials"
import ContentFlywheel from "./content-flywheel"
import PlayverseFooter from "./footer"
import CTASection from "./Container5"
import BackgroundAnimation from "./Antigravity"

const Home = () => {
  return (
    <>
      <div className="global-bg">
        <BackgroundAnimation />
      </div>
      <Container1 />
      <Container2 />
      <Container3 />
      <VideoShowcase />
      <Container4 />
      <Testimonials />
      <ContentFlywheel />
      <CTASection />
      <PlayverseFooter />
    </>
  )

}

export default Home;