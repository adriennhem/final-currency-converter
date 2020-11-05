import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'

const Footer = () => (
    <footer className="footer container-fluid">
        <ul>
            <li>
                <a href="https://github.com/adriennhem" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faGithub} />
                 </a>
            </li>
            <li>
                <a href="https://www.linkedin.com/in/adriennhem/" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
            </li>
            <li>
                <a href="https://twitter.com/adriennhem?lang=en" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} />
                </a>
            </li>
        </ul>
    </footer>
)

export default Footer;