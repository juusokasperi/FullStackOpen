import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
    const dispatch = useDispatch()
    const handleFilterChange = (event) => {
        dispatch(filterChange(event.target.value))
    }
    return (
        <div>
            filter <input onChange={handleFilterChange} />
        </div>
    )
}

export default Filter