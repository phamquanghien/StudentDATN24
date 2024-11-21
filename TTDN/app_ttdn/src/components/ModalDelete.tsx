import { Button, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

interface ModalDeleteProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  accept: () => void;
  msg?: string;
}

export default function ModalDelete({
  visible,
  setVisible,
  accept,
  msg = "Bạn chắc chắn muốn xóa mục này?",
}: ModalDeleteProps) {
  return (
    <>
      <Modal
        open={visible}
        closeIcon={null}
        footer={null}
        centered
      >
        <div className="flex flex-col items-center p-5 surface-overlay rounded-normal">
          <div className="rounded-full bg-primary inline-flex justify-center items-center h-24 w-24 -mt-20">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              size="3x"
              color="white"
            />
          </div>
          <span className="font-bold text-2xl block mb-2 mt-4">Cảnh báo</span>
          <div className="mb-8 text-xl text-center">
            Bạn có chắc chắn muốn xóa{" "}
            <span className="text-red-500">{msg}</span> không?
          </div>
          <div className="flex gap-2 justify-center">
            <Button
              size="large"
              className="rounded-normal"
              onClick={() => setVisible(false)}
              style={{ minWidth: "100px" }}
            >
              Huỷ
            </Button>
            <Button
              type="primary"
              className="rounded-normal"
              style={{ minWidth: "100px" }}
              onClick={accept}
              size="large"
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
