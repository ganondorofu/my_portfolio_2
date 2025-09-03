import { historyData } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function History() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Update History</h2>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Version</TableHead>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historyData.map((entry) => (
              <TableRow key={entry.version}>
                <TableCell className="font-medium">{entry.version}</TableCell>
                <TableCell>{entry.date}</TableCell>
                <TableCell>{entry.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
