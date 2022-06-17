import { Navbar } from "flowbite-react";
import logo from "../static/planetlogo.svg"

export function Header(): JSX.Element {
  return <header>
        <Navbar fluid={true} rounded={true}>
          <Navbar.Brand href="https://flowbite.com/">
            <img src={logo} className="mr-3 h-6 sm:h-9" alt="Planetary Logo" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Planetary
            </span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Link href="/navbars" active={true}>
              Home
            </Navbar.Link>
            <Navbar.Link href="/navbars">About</Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      </header>;
}
  