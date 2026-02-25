import "../styles/VideoShowcase.css"
import "../styles/Testimonials.css"
import "../styles/content-flywheel.css"
import "../styles/main.css"

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

// Wraps each component so one crash doesn't blank the whole page
const Safe = ({ name, children }) => {
  try {
    return children
  } catch (e) {
    return <div style={{ color: 'red', padding: 20 }}>❌ {name} crashed: {e.message}</div>
  }
}

export default function Home() {
  return (
    <>
      <div className="global-bg">
        <Safe name="BackgroundAnimation"><BackgroundAnimation /></Safe>
      </div>
      <Safe name="Container1"><Container1 /></Safe>
      <Safe name="Container2"><Container2 /></Safe>
      <Safe name="Container3"><Container3 /></Safe>
      <Safe name="VideoShowcase"><VideoShowcase /></Safe>
      <Safe name="Container4"><Container4 /></Safe>
      <Safe name="Testimonials"><Testimonials /></Safe>
      <Safe name="ContentFlywheel"><ContentFlywheel /></Safe>
      <Safe name="CTASection"><CTASection /></Safe>
      <Safe name="PlayverseFooter"><PlayverseFooter /></Safe>
    </>
  )
}