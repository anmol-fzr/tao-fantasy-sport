import * as React from "react";

import { cn } from "@/lib/utils";

function IndeterminateCheckbox({
	indeterminate,
	className = "size-6",
	...rest
}: { indeterminate?: boolean } & React.ComponentPropsWithoutRef<"input">) {
	const ref = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => {
		if (typeof indeterminate === "boolean" && ref.current) {
			ref.current.indeterminate = !rest.checked && indeterminate;
		}
	}, [indeterminate, rest.checked]);

	return (
		<input
			type="checkbox"
			ref={ref}
			className={cn("cursor-pointer", className)}
			{...rest}
		/>
	);
}

export { IndeterminateCheckbox };
