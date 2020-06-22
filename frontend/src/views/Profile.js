import React, {useEffect, useState} from "react";
import { Container, Row, Col, Button } from "reactstrap";
import Modal from 'react-modal'

import firebase from '../firebase';
import Loading from "../components/Loading";
import { useAuth0 } from "../react-auth0-spa";
import InterestForm from '../components/InterestForm';

const Profile = () => {
  const { loading, user } = useAuth0();
  const [interests, setInterests] = useState()
  const [interestFormOpen, setInterestFormOpen] = useState(false)

  useEffect(() => {
    const verifyUserRegistered = () => {
      firebase.database().ref("users/"+ user.nickname)
      .on('value', (snapshot) => {
        let userObj = snapshot.val();
        setInterests(userObj.interests.topics)
      });
    }

    verifyUserRegistered()
  }, [])

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <>
    <Modal
      isOpen={interestFormOpen}
      onRequestClose={() => setInterestFormOpen(false)}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <Button id="close" onClick={() => setInterestFormOpen(false)}>X</Button>
      <InterestForm closeModal={() => setInterestFormOpen(false)}/>
    </Modal>
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>{user.name}</h2>
          <p className="lead text-muted">{user.email}</p>
          <p className="lead text-muted">Interests: {interests}</p>
          <Button onClick={() => setInterestFormOpen(true)}>Edit Interest Form</Button>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default Profile;
