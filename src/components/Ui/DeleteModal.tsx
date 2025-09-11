import { Dispatch, SetStateAction } from "react";
import MyButton from "./MyButton";
import MyModal from "./MyModal";

type DeleteModalProp = {
  onClose: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
  title?: string;
};

function DeleteModal({ onClose, onConfirm, title }: DeleteModalProp) {
  return (
    <MyModal contentSize="xs" hasXbtn={false}>
      <p className="leading-relaxed text-center mb-4">
        {`با حذف ${title}، امکان بازیابی آن وجود نخواهد داشت.`}
        <br />
        <strong> آیا مطمئن هستید که می‌خواهید ادامه دهید؟</strong>
      </p>

      <div className="flex-between gap-x-3">
        <MyButton onClick={() => onClose(false)} variant="cancel" size="md">
          <span>انصراف</span>
        </MyButton>
        <MyButton onClick={onConfirm} variant="danger" size="md">
          <span>حذف</span>
        </MyButton>
      </div>
    </MyModal>
  );
}

export default DeleteModal;
