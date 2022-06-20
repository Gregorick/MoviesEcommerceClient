import { Modal, Icon } from "semantic-ui-react";

export default function BasicModal({
  show,
  setShow,
  children,
  title,
  ...rest
}) {
  const onClose = () => setShow(false);
  return (
    <Modal {...rest} open={show} className="basic-modal">
      <Modal.Header>
        {title} <Icon name="close" onClick={onClose}></Icon>
      </Modal.Header>
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
}
