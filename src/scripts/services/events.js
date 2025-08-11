import{repositoriesQuantity} from '../variables.js'
async function getEvents(userName) {
     const response = await fetch(`https://api.github.com/users/${userName}/events?per_page=${repositoriesQuantity}`)
     return await response.json()
     
}

export{getEvents}