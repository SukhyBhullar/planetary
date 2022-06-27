import { Navbar } from "flowbite-react";
import logo from "../static/planetlogo.svg";

export function Header(): JSX.Element {
  return (
    <header>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand href="/">
          <img
            src={logo}
            className="mr-3 h-6 sm:h-9 dark:fill-white"
            alt="Planetary Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold text-gray-900 dark:text-white">
            Planetary
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="/" active={true}>
            Home
          </Navbar.Link>
          <Navbar.Link href="/reset">Reset</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
