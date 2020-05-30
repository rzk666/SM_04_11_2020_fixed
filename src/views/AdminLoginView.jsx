import React from 'react';
// Components
import AdminLoginForm from '../components/AdminLoginForm/AdminLoginForm';
import Splash from '../components/Splash/Splash';
// Styles
import styles from './AdminLogin.module.scss';
// Util
import svc from '../util/node-service';

const imgPath = svc.isProduction ? './images' : '../../public/images';

const AdminLoginView = ({
  adminLogin,
  auth,
}) => {
  const { isLoading } = auth;
  return (
    <>
      {!isLoading ? <Splash />
        : (
          <div className={styles.wrapper}>
            <img
              src={`${imgPath}/FTL/messi.jpg`}
              style={{ width: '30%', margin: '40px 0' }}
              alt="GOLGOLGOLGOL"
            />
            <AdminLoginForm login={adminLogin} />
          </div>
        )}
    </>
  );
};

export default AdminLoginView;
