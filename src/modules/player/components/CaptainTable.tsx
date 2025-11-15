import {
	type ColumnDef,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { toast } from "sonner";
import { DataTable } from "@/components/DataTable";
import { IndeterminateCheckbox } from "@/components/ui/checkbox";
import type { Player } from "../api";
import { useDraftStore } from "../store";

export function CaptainTable() {
	const draftedPlayers = useDraftStore((s) => s.players);

	const captainId = useDraftStore((s) => s.captainId);
	const viceCaptainId = useDraftStore((s) => s.viceCaptainId);

	const setCaptain = useDraftStore((s) => s.setCaptain);
	const setViceCaptain = useDraftStore((s) => s.setViceCaptain);

	const table = useReactTable({
		data: draftedPlayers,
		columns: getColumns({
			captainId,
			viceCaptainId,
			setCaptain,
			setViceCaptain,
		}),
		getCoreRowModel: getCoreRowModel(),
		getRowId: (row) => row.id.toString(),
	});

	return <DataTable table={table} />;
}

function getColumns({ captainId, viceCaptainId, setCaptain, setViceCaptain }) {
	const columns: ColumnDef<Player>[] = [
		{
			accessorKey: "id",
			header: "",
			cell: ({ row }) => (
				<img
					src={row.original.team_logo}
					alt={row.original.team_name}
					className="aspect-square w-10"
				/>
			),
		},
		{
			accessorKey: "short_name",
			header: "Name",
			cell: ({ row }) => {
				const { short_name, team_short_name, role } = row.original;
				return (
					<div>
						<p className="sm:text-lg">{short_name}</p>
						<p className="text-sm text-muted-foreground">
							{team_short_name} - <span className="italic">{role}</span>
						</p>
					</div>
				);
			},
		},
		{
			id: "select-c",
			header: "Captain",
			cell: ({ row }) => {
				const id = row.original.id;

				return (
					<div className="px-1">
						<IndeterminateCheckbox
							checked={captainId === id}
							indeterminate={false}
							disabled={viceCaptainId === id}
							onChange={(e) => {
								if (e.target.checked) {
									if (viceCaptainId === id) {
										toast.error("Player cannot be Captain and Vice-Captain.");
										return;
									}
									setCaptain(id);
								} else {
									setCaptain(null);
								}
							}}
						/>
					</div>
				);
			},
		},
		{
			id: "select-vc",
			header: "Vice Captain",
			cell: ({ row }) => {
				const id = row.original.id;

				return (
					<div className="px-1">
						<IndeterminateCheckbox
							checked={viceCaptainId === id}
							indeterminate={false}
							disabled={captainId === id}
							onChange={(e) => {
								if (e.target.checked) {
									if (captainId === id) {
										toast.error("Player cannot be Captain and Vice-Captain.");
										return;
									}
									setViceCaptain(id);
								} else {
									setViceCaptain(null);
								}
							}}
						/>
					</div>
				);
			},
		},
	];

	return columns;
}
