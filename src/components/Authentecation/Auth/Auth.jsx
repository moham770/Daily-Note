import Lottie from "lottie-react"

import note from '../../../../public/animation/animation.json'
import { Outlet } from "react-router-dom"


const Auth = () => {
  return <section>
    <div className="grid grid-cols-1 md:grid-cols-2 items-center  gap-5 mt-10">
        <div className="hidden md:block">
        <Lottie className="h-[500px] w-full" animationData={note} />
        </div>
    <Outlet/>
    </div>
     </section>
}

export default Auth
