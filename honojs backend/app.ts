import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { expenses } from './server/routes/expenses'
import { serveStatic } from 'hono/bun'
const app = new Hono()

app.use(logger())
app.get('/test', (c) => c.json({'Hono':'Hello World!'}))

const apiRoutes = app.basePath('/api')
.route('/expenses', expenses)

app.use('/static/*', serveStatic({ root: './frontend/dist' }))
app.get('*', serveStatic({ path: './frontend/dist/index.html' }))

export default app
export type ApiRoutes = typeof apiRoutes;
