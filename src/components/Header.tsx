import { Link } from 'react-router'
import './header.css'

function Header(props: { title: string }) {
  return (
  <header className="header">
    <h1>{props.title}</h1>
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/create">Create Task</Link>
    </nav>
  </header>
  )
}

export default Header
