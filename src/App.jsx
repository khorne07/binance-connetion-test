import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import "./App.css";

const nodes = [
  {
    id: '0',
    name: 'Shopping List',
    deadline: new Date(2020, 1, 15),
    type: 'TASK',
    isComplete: true,
    nodes: 3,
  },
];

function App() {

	const data = { nodes };

	const theme = useTheme(getTheme());

	const COLUMNS = [
		{ label: "Task", renderCell: (item) => item.name },
		{
			label: "Deadline",
			renderCell: (item) =>
				item.deadline.toLocaleDateString("en-US", {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
				}),
		},
		{ label: "Type", renderCell: (item) => item.type },
		{
			label: "Complete",
			renderCell: (item) => item.isComplete.toString(),
		},
		{ label: "Tasks", renderCell: (item) => item.nodes?.length },
	];

	return <CompactTable columns={COLUMNS} data={data} theme={theme} />;
}

export default App;

