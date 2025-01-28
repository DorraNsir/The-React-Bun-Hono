import { createFileRoute } from '@tanstack/react-router'
import {api} from "../../src/lib/api"
import { useQuery } from '@tanstack/react-query';
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
  }from '../components/ui/table'
import { Skeleton } from '../components/ui/skeleton';
  
export const Route = createFileRoute('/expenses')({
  component: Expenses,
})

async function getAllExpenses() {
    await new Promise((r)=>setTimeout(r,1000))
    const res= await api.expenses.$get()
    if(!res.ok){
      throw new Error("server error")
    }
    const data = await res.json()
    return data;
  }

function Expenses() {
    const { isPending, error, data } = useQuery({
        queryKey: ["get-All-Expenses"],
        queryFn: getAllExpenses,
    });
    if (error) return "An Error has occurred: " + error.message;

    return (
        <div>
            <Table className="w-[600px] m-auto mt-10">
                <TableCaption>A list of expenses.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">id</TableHead>
                        <TableHead>description</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isPending ? Array(3)
                    .fill(0)
                    .map((_,i)=>(
                        <TableRow key={i}>
                        <TableCell className="font-medium"><Skeleton className="h-4" /></TableCell>
                        <TableCell><Skeleton className="h-4" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-4" /></TableCell>
                    </TableRow>
                    ))
                    :data?.expenses.map((expense: any) => (
                        <TableRow key={expense.id}>
                            <TableCell className="font-medium">{expense.id}</TableCell>
                            <TableCell>{expense.description}</TableCell>
                            <TableCell className="text-right">${expense.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
