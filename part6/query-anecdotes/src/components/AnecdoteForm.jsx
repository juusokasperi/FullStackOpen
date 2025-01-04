import { createAnecdote } from '../services/requests.js'
import { useQueryClient, useMutation } from '@tanstack/react-query'

import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({ mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      notificationDispatch({ type: 'NOTIFY', payload: `Anecdote '${newAnecdote.content}' created` })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 3000)
    },
    onError: (error) => {
      const errorMessage = error.response.data.error
      notificationDispatch({ type: 'NOTIFY', payload: errorMessage })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 3000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
