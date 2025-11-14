import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Game } from "iconsax-react";
import { Toaster } from "@/components/ui/sonner";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";

interface MyRouterContext {
	queryClient: QueryClient;
}

const links = [
	{
		label: "Upcoming Matches",
		to: "",
		Icon: Game,
	},
];

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: () => (
		<>
			<Toaster />
			<div className="bg-background min-h-screen max-w-6xl mx-auto p-2">
				<Outlet />
				{/*
				<footer className="bg-white/50 fixed inset-0 top-auto p-2 px-4 ">
					<nav>
						<ul>
							{links.map(({ Icon, label }) => {
								return (
									<li key={label}>
										<Icon color="white" size={32} />
										{label}
									</li>
								);
							})}
						</ul>
					</nav>
				</footer>
        */}
			</div>
			<TanStackDevtools
				config={{
					position: "bottom-right",
				}}
				plugins={[
					{
						name: "Tanstack Router",
						render: <TanStackRouterDevtoolsPanel />,
					},
					TanStackQueryDevtools,
				]}
			/>
		</>
	),
});
