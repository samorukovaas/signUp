import React, { FC, useState } from "react";
import { Modal, Button } from "@material-ui/core";
import classes from "../SignUp/SignUp.module.scss";
import ForgotPassword from "./ForgotPassword";

const ModalPassword: FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const body = (
    <div className={classes.modal}>
      <ForgotPassword />
    </div>
  );

  return (
    <div>
      <Button onClick={handleOpen} className={classes.btn}>
        Забыли пароль?
      </Button>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
};

export default ModalPassword;
