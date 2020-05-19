import React from 'react'
import Attendence from "./attendence";
import ItemList from "./itemList";
import Form from "react-bootstrap/Form";
import Header from './Header'

const CurrentSession = (session) => {

  return (
    <>
    <Header session={session}/>
      <Attendence id={session.id} />
      <Form>
        <Form.Group style={styles.foodForm}>
          <ItemList id={session.id} listType="food" />
        </Form.Group>
        <Form.Group style={styles.foodForm}>
          <ItemList id={session.id} listType="drinks" />
        </Form.Group>
      </Form>
    </>
  )
};

export default CurrentSession

const styles = {
  foodForm: {
    width: "50%",
    display: "inline-block"
  }
};