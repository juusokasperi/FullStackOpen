/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
    <div key={anecdote.id}>
        <div>
            {anecdote.content}
        </div>
        <div>
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
        </div>
    </div>
    )}

const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        if ( filter === '') {
            return anecdotes
        } else {
            return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        }
    })

    const sortedAnecdotes = [...anecdotes].sort((an1, an2) => an2.votes - an1.votes)

    const handleVote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`You voted '${anecdote.content}'`, 3))
    }

    return (
        <>
        <h2>Anecdotes</h2>
        {sortedAnecdotes.map(anecdote =>
            <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => handleVote(anecdote)}
            />
        )}
        </>
    )
}

export default Anecdotes