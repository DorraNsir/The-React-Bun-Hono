import {Hono} from 'hono'
import {z} from 'zod'
import { zValidator } from '@hono/zod-validator'

type Expense = {
    id: number
    amount: number
    description: string
    }

    const ExpenseSchema = z.object({
        id:z.number().int().positive().min(1),
        amount: z.number().int().positive(),
        description: z.string().min(3).max(255)
    })

    const createExpenseSchema=ExpenseSchema.omit({id:true})

    const sampleExpenses: Expense[] = [
        { id: 1, amount: 50, description: 'Groceries' },
        { id: 2, amount: 20, description: 'Transport' },
        { id: 3, amount: 100, description: 'Utilities' },
        { id: 4, amount: 100, description: 'Utilities' }
    ];

export const expenses = new Hono()
.get('/', (c) => c.json({expenses: sampleExpenses}))

.post('/',zValidator("json",createExpenseSchema) ,async(c) => {
    const expense= c.req.valid("json")
    sampleExpenses.push({...expense,id: (sampleExpenses.length + 1)})
    c.status(201)
    return c.json(expense)})

.get("/total-spent",(c)=>{
    const total=sampleExpenses.reduce((acc,expense)=>acc+expense.amount,0)
    return c.json({total})
})

.get('/:id{[0-9]}', (c) => {
    const id = parseInt(c.req.param("id"))
    const expense = sampleExpenses.find((expense) => expense.id === id)
    if (!expense) {
        return c.notFound()
    }
    return c.json(expense)
})

.delete('/:id{[0-9]}', (c) => {
    const id = parseInt(c.req.param("id"))
    const index = sampleExpenses.findIndex((expense) => expense.id === id)
    if (index === -1) {
        return c.notFound()
    }
    sampleExpenses.splice(index, 1)
    return c.json({ message: 'Expense deleted successfully' })
})

.put('/', (c) => c.json({}))