/* eslint-disable no-underscore-dangle */
import React from 'react';
// Components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// Styles
import styles from './AdminLoginForm.module.scss';
import FORMS from '../../common/form-fields';

// ----- Dictioneries ----- //
const { ADMIN_LOGIN_FIELDS } = FORMS;

// Help Components
class AdminLoginForm extends React.Component {
  constructor(props) {
    super(props);
    // Fields indexes
    // 0 -> emailField
    // 1 -> passwordField
    const refs = [];
    for (let i = 0; i < Object.keys(ADMIN_LOGIN_FIELDS).length; i += 1) {
      refs[i] = React.createRef();
    }
    this.state = {
      formFieldsRefs: refs,
    };
  }

  handleLogin() {
    const { login } = this.props;
    const { formFieldsRefs } = this.state;
    const email = formFieldsRefs[0].current.value;
    const password = formFieldsRefs[1].current.value;
    const data = { email, password };
    login(data);
  }

  render() {
    const { formFieldsRefs } = this.state;
    const fields = Object.keys(ADMIN_LOGIN_FIELDS).map((key, i) => (
      <Form.Group
        className={styles.form_group}
        key={`${key}_${i}`}
      >
        <Form.Label
          key={`loginlabel_${i}`}
        >
          {ADMIN_LOGIN_FIELDS[key].placeholder}
        </Form.Label>
        <Form.Control
          ref={formFieldsRefs[i]}
          type={ADMIN_LOGIN_FIELDS[key].type}
          placholder={ADMIN_LOGIN_FIELDS[key].placeholder}
        />
      </Form.Group>
    ));
    return (
      <>
        <Form>
          {fields}
          <div className={styles.login_btn}>
            <Button
              onClick={() => this.handleLogin()}
              style={{ backgroundColor: '#57BB78' }}
            >
              Login
            </Button>
          </div>
        </Form>
      </>
    );
  }
}

export default AdminLoginForm;
