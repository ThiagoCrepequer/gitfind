import './styles.css'

const BlocosRepositorio = ({nome, descricao, link}) => {
  return (
    <a href={link} rel="noreferrer" target="_blank">
      <div className='container-repositorio'>
          <h3 className="nome-repositorio">{nome}</h3>
          <div className='container-texto'>
            <p className='descricao-repositorio'>{descricao}</p>
          </div>

      </div>
    </a>
  )
}

export {BlocosRepositorio}
