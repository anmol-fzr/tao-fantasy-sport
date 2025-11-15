import {
	isMatch,
	Link,
	type LinkProps,
	matchByPath,
	useLocation,
} from "@tanstack/react-router";
import { Game, type Icon, People } from "iconsax-react";
import { GithubIcon, Linkedin, Mail } from "lucide-react";

const socials = [
	{
		Icon: GithubIcon,
		label: "Github",
		link: "https://github.com/anmol-fzr",
	},
	{
		Icon: Linkedin,
		label: "Linkedin",
		link: "https://linkedin.com/in/anmol-fzr/",
	},
	{
		Icon: Mail,
		label: "Mail",
		link: "mailto:anmoljan2005@gmail.com",
	},
];

const links: { label: string; Icon: Icon; to: LinkProps["to"] }[] = [
	{
		label: "Upcoming Matches",
		to: "/matches",
		Icon: Game,
	},
	{
		label: "My Teams",
		to: "/teams",
		Icon: People,
	},
];

export function Header() {
	return (
		<div className="shadow-lg sticky top-0 z-10 border-b mb-2 bg-background/25 backdrop-blur-xs w-full">
			<header>
				<nav className="p-4 flex items-center justify-end md:justify-between text-white max-w-6xl mx-auto gap-4">
					<ul className="gap-4 hidden md:flex">
						{links.map(({ Icon, label, to }) => {
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
										<Icon color="white" size={32} />
										{label}
									</Link>
								</li>
							);
						})}
					</ul>

					<div className="flex ">
						{socials.map((social) => {
							const { Icon, label, link } = social;
							return (
								<Link
									to={link}
									target="_blank"
									title={label}
									key={label}
									className="p-2"
								>
									<Icon />
								</Link>
							);
						})}
					</div>
				</nav>
			</header>
		</div>
	);
}

export { links as navLinks };
