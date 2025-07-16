import {getUser} from "./services/user.js";
import{getRepositories}from "./services/repositories.js";
import{user} from "./objects/user.js";
import{screen} from "./objects/screen.js";

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

        user.setInfo(userResponse)
        user.setRepositories(repositoriesResponse)
        screen.renderUser(user)
        
    } catch (error) {
        console.log(error);
    }
}


// function getUserRepositories(userName) {
//     getRepositories(userName).then((reposData) =>{
//         // INFORMACOES DO LOG DO REPO DATA
//         //html_url
//         //name
//         let repositoriesItens = ""
//         reposData.forEach(repo => {
//             repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`
//         });
//         document.querySelector('.profile-data').innerHTML += `<div class="repositories section">
//                                                                  <h2>Repositórios</h2>
//                                                                  <ul>${repositoriesItens}</ul>
//                                                               </div>`
//     })
// }

