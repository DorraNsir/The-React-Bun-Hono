import { useEffect, useState } from 'react';
import './App.css';
import { Card, CardTitle, CardDescription, CardContent, CardHeader } from './components/ui/card';

function App() {
  const [totalSpent, setTotalSpent] = useState(0);
  useEffect(() => {
    async function fetchTotalSpent() {
    const res= await fetch('/api/expenses/total-spent')
    const data = await res.json()
    setTotalSpent(data.total)
    }
    fetchTotalSpent()
  },[]);
  return (
    <>
      <Card className="w-[350px] m-auto mt-10">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>the total amount you've spent </CardDescription>
        </CardHeader>
        <CardContent>
          {totalSpent}
        </CardContent>
      </Card>
    </>
  );
}

export default App;
