import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

function Footer() {
  return (
    <MDBFooter color="unique-color-dark" className="font-small pt-4 ">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Computer rentals</h5>
            <p>Here you can pick whatever you need to work, rest, sho</p>
          </MDBCol>
          <MDBCol md="6">
            <ul>
              <li className="list-unstyled">
                <a href="https://vk.com/tihamey">Vk</a>
              </li>
              <li className="list-unstyled">
                <a href="https://github.com/hassty/uzhas-arkhema/">github</a>
              </li>
              <li className="list-unstyled">
                <a href="https://wiki.archlinux.org/">arch</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://vk.com/tihamey">TihCorp</a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;
