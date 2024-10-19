import OrbitingCircles from "@/components/ui/orbiting-circles";
import { MessageCircle } from "lucide-react";
import { AiFillShop } from "react-icons/ai";
import { BsReceipt } from "react-icons/bs";
import { FaBoxesStacked } from "react-icons/fa6";
import { HiOutlineUsers } from "react-icons/hi";
import { MdOutlineLocationOn } from "react-icons/md";

export function OrbitingServices() {
	return (
		<div className="relative flex h-[500px] w-full max-w-[32rem] items-center justify-center overflow-hidden">
			<span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-purple-500 to-gray-300/80 bg-clip-text text-center text-9xl font-semibold leading-none text-transparent dark:from-purple-500 dark:to-slate-900/10">
				K
			</span>

			{/* Inner Circles */}
			<OrbitingCircles
				className="h-[30px] w-[30px] border-none bg-transparent"
				duration={20}
				delay={20}
				radius={80}
			>
				<FaBoxesStacked />
			</OrbitingCircles>
			<OrbitingCircles
				className="h-[30px] w-[30px] border-none bg-transparent"
				duration={20}
				delay={10}
				radius={80}
			>
				<AiFillShop />
			</OrbitingCircles>

			{/* Outer Circles (reverse) */}
			<OrbitingCircles
				className="h-[40px] w-[40px] border-none bg-transparent"
				reverse
				radius={135}
				duration={40}
				delay={10}
			>
				<HiOutlineUsers className="w-5 h-5" />
			</OrbitingCircles>
			<OrbitingCircles
				className="h-[40px] w-[40px] border-none bg-transparent"
				reverse
				radius={135}
				duration={40}
				delay={30}
			>
				<MessageCircle className="w-5 h-5" />
			</OrbitingCircles>
			<OrbitingCircles
				className="h-[50px] w-[50px] border-none bg-transparent"
				radius={190}
				duration={30}
				delay={10}
			>
				<BsReceipt className="w-6 h-6" />
			</OrbitingCircles>
			<OrbitingCircles
				className="h-[50px] w-[50px] border-none bg-transparent"
				radius={190}
				duration={30}
				delay={25}
			>
				<MdOutlineLocationOn className="w-6 h-6" />
			</OrbitingCircles>
		</div>
	);
}
