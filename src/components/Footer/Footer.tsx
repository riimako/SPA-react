import './footer.css'
import linkedin from '../../assets/linkedin.png'
import github from '../../assets/github-mark.png'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <span>&copy; {currentYear} Riina Maria Korpela</span>
        <div className="social-links">
          <a
            href="https://www.linkedin.com/in/riinamariakorpela/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Perfil de LinkedIn"
          >
            <img className="footer-logo" src={linkedin} />
          </a>
          <a
            href="https://github.com/riimako"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Perfil de GitHub"
          >
            <img className="footer-logo" src={github} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
