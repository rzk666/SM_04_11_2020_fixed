import React from 'react';
// Components
import AdminLoginForm from '../components/AdminLoginForm/AdminLoginForm';
import Splash from '../components/Splash/Splash';
// Styles
import styles from './AdminLogin.module.scss';
// Images
import Messi from '../static/images/FTL/messi.jpg';

const AdminLoginView = ({
  adminLogin,
  showSplash,
}) => {
  const x = 5;
  return (
    <>
      { showSplash ? <Splash />
        : (
          <div className={styles.wrapper}>
            GOAL GOAL GOAL GOAL GOAL
            <img
              src={Messi}
              style={{ width: '30%', margin: '40px 0' }}
              alt="GOLGOLGOLGOL"
            />
            <AdminLoginForm login={adminLogin} />
          </div>
        ) }
    </>
  );
};

export default AdminLoginView;
