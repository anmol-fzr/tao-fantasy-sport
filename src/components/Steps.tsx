import { Check } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const steps = [
	"Pick a Match",
	"Pick Players for your Team",
	"Select Captain & Vice Captain",
];

interface StepsProps {
	currStep: number;
}

export const Steps = (props: StepsProps) => {
	const { currStep } = props;

	return (
		<Alert className="mb-4">
			<AlertTitle>How to Create a Team</AlertTitle>
			<AlertDescription>
				<ul className="px-6">
					{steps.map((step, index) => (
						<li key={step} className="flex gap-2 items-center">
							<Check
								className={
									currStep >= index ? "text-white" : "text-muted-foreground"
								}
								size={20}
							/>{" "}
							{step}
						</li>
					))}
				</ul>
			</AlertDescription>
		</Alert>
	);
};
