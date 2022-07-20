import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Navigationbar() {
  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand target="_blank" rel="noopener noreferrer" href="https://www.inf.uni-hamburg.de/en/inst/ab/lt/home.html">
            <img
              alt=""
              src="https://www.uni-hamburg.de/16809753/uhh-logo-insert-6a9742755df2ab4c64c62c24740883d1dbab4529.png"
              height="75"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
            <span className="align-middle">Financial entity detection and relation extraction</span>
            <span className="align-middle">EMNLP 2022 Demo</span>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigationbar;