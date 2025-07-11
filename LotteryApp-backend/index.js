import app from './app.js'
import { PORT } from './utils/config.js'

app.listen(PORT, () => {
  console.log('Lottery App backend is running on port 3000')
})
