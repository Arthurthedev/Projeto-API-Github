const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                            <img src="${user.avatarUrl}" alt="Foto de perfil do Usuário">
                            <div class="data">
                                <h1>${user.name ?? "Não possui nome cadastrado"}</h1>
                                <p class="followers">Seguidores:${user.followers} | Seguindo:${user.following}</p>
                                <p>${user.bio ?? "Não possui bio cadastrada"}</p>
                            </div>
                        </div>`
        let repositoriesItens = ''
        user.repositories.forEach(repo => {
            repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}
                                  <div class="repo-infos">
                                  <p>🍴 ${repo.forks}</p>
                                  <p>⭐ ${repo.stargazers_count}</p>
                                  <p>👀 ${repo.watchers}</p>
                                  <p>🤖 ${repo.language ? repo.language : "sem-linguagem"}</p>
                                  </div>
                                  </a>
                                  </li>`
        });
        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`
        }
        let eventsItens = ''
        user.events.forEach(event =>{
            if (event.type === "PushEvent") {
                event.payload.commits.forEach(commit => {
            eventsItens += `<li><span>${event.repo.name}</span> - ${commit.message}</li>`;
        });
            } else {
                eventsItens += `<li><span>${event.repo.name}</span> - sem mensagem de commit</li>`;
            }
            document.querySelector('.events').innerHTML = `<h2>Eventos</h2>
                                                          <ul>${eventsItens}</ul>`
        })
        
    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}
export { screen }