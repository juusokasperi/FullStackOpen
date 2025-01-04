import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './services/requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Anecdotes from './components/Anecdotes'

const App = () => {

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
  const anecdotes = result.data
  if ( result.isLoading ) {
    return <div>Loading data..</div>
  }
  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }


  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />
      <Anecdotes anecdotes={anecdotes} />
    </div>
  )
}

export default App
