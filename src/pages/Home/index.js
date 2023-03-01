import { Header } from '../../components/Header'
import { BlocosRepositorio } from '../../components/BlocosRepositorio';
import background from '../../assets/github.png'
import './styles.css'
import { useState } from 'react';

function App() {
  const [user, setUser] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [repositorios, setRepositorios] = useState(null)

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`)
    const newUser = await userData.json()

    if(newUser.name) {
      const {avatar_url, name, bio, login} = newUser
      setCurrentUser({avatar_url, name, bio, login})
    }

    const repositoriosData = await fetch(`https://api.github.com/users/${user}/repos`)
    const newRepos = await repositoriosData.json()

    console.log(newRepos)
    if(newRepos.length) {
      setRepositorios(newRepos)
    }
  }

    return (
      <div className="App">
        <Header />
        <img src={background} className="background" alt='background app'/>
        <div className='conteudo'>
          <div className='info'>
            
            <div>
              <input 
                name='usuario' 
                value={user} 
                onChange={event => setUser(event.target.value)} 
                placeholder='@Usuário'
              />
              <div className='container-botao'>
                <button onClick={handleGetData}>Buscas</button>
              </div>
            </div>
            
            {currentUser ? (<>
              <div className='perfil'>
                <img src={currentUser.avatar_url} className='profile' alt='foto de perfil'/>
                <div className='descricao-perfil'>
                  <h3>{currentUser.name}</h3>
                  <span className='identificacao'>@{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              
              <hr />
              {repositorios ? (
                <div className='repositorios'>
                  <h2 className='titulo-repositorios'>Repositórios</h2>
                  {repositorios.map(repositorio => {
                    return <BlocosRepositorio key={repositorio.name} nome={repositorio.name} descricao={repositorio.description} link={repositorio.html_url} className="repositorio"/>
                  })}
                </div>
              ) : <></>}

            </>) : <></>}
          
          </div>
        </div>
      </div>
    );
  }
  
  export default App;
  