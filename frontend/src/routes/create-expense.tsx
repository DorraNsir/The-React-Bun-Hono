import { Input } from '../components/ui/input'
import { createFileRoute } from '@tanstack/react-router'
import { api } from "../../src/lib/api"
import { useState } from 'react';

export const Route = createFileRoute('/create-expense')({
  component: CreateExpense,
})

async function createExpense(description: string, amount: number) {
  const res = await api.expenses.$post({
    description,
    amount,
  });
  console.log(res);
}

function CreateExpense() {

  const [amount, setAmount] = useState<number>();
  const [description, setDescription] = useState<string>('');

  return (
    <>
      <Input
        className='w-[600px] m-auto mt-10'
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        className='w-[600px] m-auto mt-10'
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
    </>
  )
}
