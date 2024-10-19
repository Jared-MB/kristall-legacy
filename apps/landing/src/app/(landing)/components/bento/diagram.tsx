"use client";

import { AnimatedBeam, Circle } from "@/components/ui/animated-beam";
import { Card, CardBody } from "@/components/ui/card";
import { Store, User, Users } from "lucide-react";
import { useRef } from "react";

export default function Diagram() {
	const containerRef = useRef<HTMLDivElement>(null);

	// USER
	const div7Ref = useRef<HTMLDivElement>(null);

	// KRISTALL
	const div6Ref = useRef<HTMLDivElement>(null);

	// SHOPS
	const div1Ref = useRef<HTMLDivElement>(null);
	const div2Ref = useRef<HTMLDivElement>(null);
	const div3Ref = useRef<HTMLDivElement>(null);

	// CLIENTS
	const div8Ref = useRef<HTMLDivElement>(null);
	const div9Ref = useRef<HTMLDivElement>(null);

	return (
		<Card variant="container" className="w-full">
			<CardBody ref={containerRef} className="lg:px-24">
				<div className="grid grid-cols-3 h-full w-full gap-12 gap-y-24 place-items-center">
					<div className="flex flex-col justify-center col-span-1">
						<Circle className="w-16 h-16" ref={div7Ref}>
							<User className="h-8 w-8" />
						</Circle>
					</div>
					<div className="flex flex-col justify-center col-span-1">
						<Circle
							ref={div6Ref}
							className="h-20 w-20 text-5xl font-medium text-purple-500"
						>
							K
						</Circle>
					</div>
					<div className="flex flex-col justify-center gap-2 col-span-1">
						<Circle className="w-16 h-16" ref={div1Ref}>
							<Store className="h-8 w-8" />
						</Circle>
						<Circle className="w-16 h-16" ref={div2Ref}>
							<Store className="h-8 w-8" />
						</Circle>
						<Circle className="w-16 h-16" ref={div3Ref}>
							<Store className="h-8 w-8" />
						</Circle>
					</div>
					<div className="flex flex-row gap-x-48 justify-center w-full col-start-2 col-end-3">
						<Circle className="w-16 h-16" ref={div8Ref}>
							<Users className="h-8 w-8 text-purple-500" />
						</Circle>
						<Circle className="w-16 h-16" ref={div9Ref}>
							<Users className="h-8 w-8 text-purple-500" />
						</Circle>
					</div>
				</div>
				<AnimatedBeam
					containerRef={containerRef}
					fromRef={div1Ref}
					toRef={div6Ref}
				/>
				<AnimatedBeam
					containerRef={containerRef}
					fromRef={div2Ref}
					toRef={div6Ref}
				/>
				<AnimatedBeam
					containerRef={containerRef}
					fromRef={div3Ref}
					toRef={div6Ref}
				/>
				<AnimatedBeam
					containerRef={containerRef}
					fromRef={div6Ref}
					toRef={div7Ref}
				/>
				<AnimatedBeam
					containerRef={containerRef}
					fromRef={div6Ref}
					toRef={div8Ref}
					reverse
					pathOpacity={0}
					// duration={ANIMATION_DURATION * 2}
				/>
				<AnimatedBeam
					containerRef={containerRef}
					fromRef={div6Ref}
					toRef={div8Ref}
					// duration={ANIMATION_DURATION * 2}
				/>
				<AnimatedBeam
					containerRef={containerRef}
					fromRef={div6Ref}
					toRef={div9Ref}
					reverse
					pathOpacity={0}
					// duration={ANIMATION_DURATION * 2}
				/>
				<AnimatedBeam
					containerRef={containerRef}
					fromRef={div6Ref}
					toRef={div9Ref}
					// duration={ANIMATION_DURATION * 2}
				/>
				<AnimatedBeam
					containerRef={containerRef}
					fromRef={div3Ref}
					toRef={div9Ref}
				/>
				<AnimatedBeam
					containerRef={containerRef}
					fromRef={div3Ref}
					toRef={div9Ref}
					reverse
					pathOpacity={0}
				/>
				{/* <AnimatedBeam
					containerRef={containerRef}
					fromRef={div6Ref}
					toRef={div9Ref}
					reverse
				/> */}
			</CardBody>
		</Card>
	);
}
