import { Link } from "@tanstack/react-router";
import { navLinks } from "./header";

export function BottomNavBar() {
	return (
		<div className="shadow-lg sticky inset-0 top-auto z-10 border-t mb-2 bg-background/90 backdrop-blur-xs w-full">
			<footer>
				<nav className="">
					<ul className="gap-4 md:hidden flex justify-evenly items-center">
						{navLinks.map(({ Icon, label, to }) => {
							return (
								<li
									key={label}
									title={label}
									className="flex flex-col p-2 gap-2 items-center text-xs"
								>
									<Link
										to={to}
										activeProps={{
											className: "border-white",
										}}
										className="flex flex-col items-center gap-1 border-b-2 border-transparent"
									>
										<Icon color="white" size={24} />
										{label}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			</footer>
		</div>
	);
}
