/*

API a ser consumida:

Lista de usuários: https://jsonplaceholder.typicode.com/users
Posts de um usuário: https://jsonplaceholder.typicode.com/posts?userId=X

Ao carregar a página, fazer uma requisição para obter a lista de usuários
e exibi-los como cards
Cada card de usuário deve mostrar:

Nome
Email
Nome da empresa
Um botão para "Ver detalhes"


Ao clicar em "Ver detalhes", deve:

Mostrar mais informações sobre o usuário (endereço, telefone, website)
Fazer uma nova requisição para buscar e exibir os posts desse usuário
Alternar a visibilidade da seção de detalhes (expandir/recolher)


Implementar indicadores de carregamento durante as requisições
Tratar erros adequadamente e exibir mensagens amigáveis
Bônus: Adicionar funcionalidade de busca para filtrar usuários por nome ou
email

Dicas:

Use a Fetch API com async/await
Utilize manipulação do DOM para criar e atualizar elementos dinamicamente
Organize seu código com funções específicas para cada tarefa (buscar usuários,
buscar posts, criar elementos, etc.)
Lembre-se de tratar os estados de carregamento e possíveis erros

*/

const dados = document.querySelector("#users-container")
const loading = document.querySelector("#loading");

async function recebeUsuario() {
    try {

        loading.style.display = "block"
        const response = await fetch('https://jsonplaceholder.typicode.com/users')

        if (!response.ok) {
            throw new Error("Erro na requisicão");
        }
        const data = await response.json()

        data.forEach(usuarios => {
            const usuario = document.createElement("div");
            usuario.classList.add("user-card")
            dados.appendChild(usuario)
            const usuario_details = document.createElement("p")
            usuario_details.innerHTML = `
                <p>Nome: ${usuarios.name}</p>
                <p>Email: ${usuarios.email}</p>
                <p>Nome da empresa: ${usuarios.company.name}</p>
                <button class="btn_detalhes" data-id="${usuarios.id}">Ver Detalhes</Button>
                <div class="user-details" id="details-${usuarios.id}"></div>
            `
            usuario.appendChild(usuario_details)

            const datalhes_do_usuario = document.querySelector(".user-details")

            async function recebePostUsuario() {
                try {
                    const response = await fetch("https://jsonplaceholder.typicode.com/posts?userId=X")

                    if (!response.ok) {
                        throw new Error("Erro na requisição")
                    }
                    const posts = await response.json()

                    data.forEach(post => {
                        document.querySelectorAll(".btn_detalhes").forEach(btn => {
                            btn.addEventListener("click", (e) => {
                                datalhes_do_usuario.innerHTML = `
                                <p>Endereço: ${post.address}</p>
                                <p>Telefone: ${post.phone}</p>
                                <p>Website: ${post.website}</p>
                            `
                            })
                        })
                    })
                } catch (error) {
                    console.error("error: ", error)
                }
            }

            recebePostUsuario()
        })

        console.log(data)
    } catch (error) {
        console.error("error ", error)
    }

}

recebeUsuario()




