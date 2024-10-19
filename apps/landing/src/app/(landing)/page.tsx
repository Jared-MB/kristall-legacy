import {
	Bento,
	CTA,
	DynamicChart,
	Footer,
	ImagePreview,
	OverviewSection,
	Resume,
	Steps,
	VirtualShowroom,
} from "./components";
import SectionContainer from "./components/section-container";

export default function Home() {
	return (
		<div className="pt-16 flex min-h-screen flex-col justify-between gap-12 relative px-8 md:px-0 overflow-x-hidden">
			<Resume />
			<ImagePreview />
			{/* 
			// TODO: CLIENTS
			*/}
			<Steps />
			<SectionContainer>
				<DynamicChart />
			</SectionContainer>
			<OverviewSection />
			<SectionContainer>
				<Bento />
			</SectionContainer>
			<SectionContainer>
				<CTA />
			</SectionContainer>
			<SectionContainer>
				<VirtualShowroom />
			</SectionContainer>
			<Footer />
		</div>
	);
}
