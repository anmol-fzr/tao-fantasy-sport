import {
	type ColumnDef,
	getCoreRowModel,
	type RowSelectionState,
	useReactTable,
} from "@tanstack/react-table";
import { type HTMLProps, use, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { DataTable } from "@/components/DataTable";
import { cn } from "@/lib/utils";
import type { Player } from "../api";
import { PLAYERS } from "../api";
import { useDraftStore } from "../store";
import { validateAddPlayer } from "../validator";

const playersPromise = PLAYERS.ALL();

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
		accessorKey: "event_total_points",
		header: "Points",
	},
	{
		accessorKey: "event_player_credit",
		header: "Credits",
	},
	{
		id: "select",
		header: "Select",
		cell: ({ row }) => (
			<div className="px-1">
				<IndeterminateCheckbox
					checked={row.getIsSelected()}
					disabled={!row.getCanSelect()}
					indeterminate={row.getIsSomeSelected()}
					onChange={row.getToggleSelectedHandler()}
				/>
			</div>
		),
	},
];

export function PlayersTable() {
	const { data: players } = use(playersPromise);

	const setDraftPlayers = useDraftStore((s) => s.setPlayers);
	const draftedPlayers = useDraftStore((s) => s.players);

	const [rowSelection, setRowSelection] = useState<RowSelectionState>(() => {
		const obj: RowSelectionState = {};
		draftedPlayers.forEach((p) => {
			obj[p.id.toString()] = true;
		});
		return obj;
	});

	const table = useReactTable({
		data: players,
		columns,
		getCoreRowModel: getCoreRowModel(),

		state: { rowSelection },

		onRowSelectionChange: (updater) => {
			const next =
				typeof updater === "function" ? updater(rowSelection) : updater;

			const prevKeys = Object.keys(rowSelection);
			const nextKeys = Object.keys(next);

			const isAdding = nextKeys.length > prevKeys.length;

			if (!isAdding) {
				setRowSelection(next);
				return;
			}

			const addedId = nextKeys.find((k) => !prevKeys.includes(k));
			const playerToAdd = players.find((p) => p.id.toString() === addedId);

			const { ok, error } = validateAddPlayer(
				draftedPlayers,
				playerToAdd as Player,
			);

			if (!ok) {
				toast.error(error);
				return;
			}

			setRowSelection(next);
		},

		getRowId: (row) => row.id.toString(),
	});

	useEffect(() => {
		const selectedRows = table.getSelectedRowModel().rows;
		const selectedPlayers = selectedRows.map((r) => r.original);
		setDraftPlayers(selectedPlayers);
	}, [rowSelection]);

	return <DataTable table={table} />;
}

function IndeterminateCheckbox({
	indeterminate,
	className = "",
	...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
	const ref = useRef<HTMLInputElement>(null);

	useEffect(() => {
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
