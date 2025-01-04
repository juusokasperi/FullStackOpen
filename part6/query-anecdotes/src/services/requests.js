import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createAnecdote = async (newAnecdote) => {
  const object = { content: newAnecdote.content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

export const voteAnecdote = async (content) => {
  const votedAnecdote = content.anecdote
  const object = { ...votedAnecdote, votes: votedAnecdote.votes + 1 }
  const response = await axios.put(`${baseUrl}/${votedAnecdote.id}`, object)
  return response.data
}