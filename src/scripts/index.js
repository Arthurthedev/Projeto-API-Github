import { getUser } from "./services/user.js";
import{ getRepositories }from "./services/repositories.js";
import{ user } from "./objects/user.js";
import{ screen } from "./objects/screen.js";
import { getEvents } from "./services/events.js";


document.getElementById('btn-search').addEventListener("click", ()=>{
    const userName = document.getElementById('input-search').value
    if (validateEmptyInput(userName)) return
    getUserData(userName)
})

function validateEmptyInput(userName) {
    if (userName.length === 0) {
        alert('Preencha o campo com o nome do usuario do GitHub')
        return true
    }
}

document.getElementById('input-search').addEventListener("keyup", (e) => {
  const userName = e.target.value;
  const isEnterKeyPressed = e.key === "Enter";
    if (isEnterKeyPressed) {
        if (validateEmptyInput(userName)) return
    getUserData(userName);
  }
});

async function getUserData(userName) {
    try {
        const userResponse = await getUser(userName) 
        if (userResponse.message === "Not Found") {
            screen.renderNotFound()
            return
        }
        const repositoriesResponse = await getRepositories(userName)
        const eventsResponse = await getEvents(userName)

        user.setInfo(userResponse)
        user.setRepositories(repositoriesResponse)
        user.setEvents(eventsResponse)
        screen.renderUser(user)
        
        
    } catch (error) {
        console.log(error);
    }
}
