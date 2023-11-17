import Lottie from "lottie-react"
import { Outlet } from "react-router-dom"
import bubles from '../public/animation/bubles.json'

const App = () => {
  return <main style={{minHeight:'95vh'}} className="text-white   relative ">
      <Lottie animationData={bubles} className="absolute top-0 left-0 right-0 bottom-0 rotate-180 z-[-5]"/> 

    <div className=" px-5  ">

    <Outlet/>

    </div>
  </main>
}

export default App
