import { createStore, persist } from 'easy-peasy'
import model from '../model/model'

const store = createStore(
    persist(model, {storage: localStorage}),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store