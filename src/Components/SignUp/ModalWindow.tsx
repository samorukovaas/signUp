import React, { FC, useState } from "react";
import { Modal, Button } from "@material-ui/core";
import classes from "./SignUp.module.scss";
import SignUp from "../SignUp/SignUp";

type SignUpProps = {
  email: string;
  password: string;
};

const ModalWindow: FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const body = (
    <div className={classes.modal}>
      <SignUp />
    </div>
  );

  return (
    <div>
      <Button onClick={handleOpen} className={classes.btn}>
        Зарегистрироваться
      </Button>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
};

export default ModalWindow;
