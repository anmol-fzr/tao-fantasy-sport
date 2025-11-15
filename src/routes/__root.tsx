//import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { BottomNavBar } from "@/components/footer";
//import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";

//import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: () => (
		<>
			<Toaster />
			<Header />
			<div className="bg-background min-h-screen max-w-6xl mx-auto p-2">
				<Outlet />
			</div>
			<BottomNavBar />
			{/*
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
      */}
		</>
	),
});
