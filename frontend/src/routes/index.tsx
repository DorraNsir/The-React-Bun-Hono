import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

import { Card, CardTitle, CardDescription, CardContent, CardHeader } from '.././components/ui/card';
import {api} from "../../src/lib/api"
import { useQuery } from '@tanstack/react-query';


async function getTotalSpent() {
  const res= await api.expenses["total-spent"].$get()
  if(!res.ok){
    throw new Error("server error")
  }
  const data = await res.json()
  return data;
}


function Index() {
  const {isPending,error,data}=useQuery({
    queryKey:["get-totla-spent"],
    queryFn:getTotalSpent,
  });
  if (isPending)return"Loading...";
  if(error)return "An Error has occurred: "+ error.message;
  return (
    <>
      <Card className="w-[350px] m-auto mt-10">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>the total amount you've spent </CardDescription>
        </CardHeader>
        <CardContent>
          {data.total}
        </CardContent>
      </Card>
    </>
  );
}

export default Index;

