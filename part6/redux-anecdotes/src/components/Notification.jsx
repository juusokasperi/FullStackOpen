import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)

  if (notification === '') {
    return null
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    borderRadius: '10px',
    width: '25vw',
    marginBottom: 10,
    backgroundColor: '#dfe8ff'
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification