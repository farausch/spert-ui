import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Navigationbar() {
  return (
    <>
      <Navbar bg="light">
        <Container>
            <span className="align-middle">Financial Entity Detection and Relation Extraction</span>
            <span className="align-middle">EMNLP 2022 Demo</span>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigationbar;