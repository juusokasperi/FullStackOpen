/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { voteAnecdote } from '../services/requests'
import { useNotificationDispatch } from '../NotificationContext'

const Anecdotes = ({ anecdotes }) => {
  const notificationDispatch = useNotificationDispatch()
  const sortedAnecdotes = [...anecdotes].sort((an1, an2) => an2.votes - an1.votes)
  const queryClient = useQueryClient()
  const anecdoteVoteMutation = useMutation({ mutationFn: voteAnecdote,
    onSuccess: (votedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(an => an.id !== votedAnecdote.id ? an : votedAnecdote))
    },
  })
  const handleVote = async (anecdote) => {
    anecdoteVoteMutation.mutate({ anecdote })
    const content = anecdote.content
    notificationDispatch({ type: 'NOTIFY', payload: `Anecdote '${content}' voted!` })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 3000)
  }


  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
                has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Anecdotes