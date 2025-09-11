import LabelWithDot from "./LabelWithDot";
import InputField from "./InputField";
import SelectField from "./SelectField";
import MyModal from "../Ui/MyModal";
import { toEnglishDigits } from "./../Utils/numberUtils";
import useFont from "../contexts/FontModal/useFont";
import { ChangeEvent, memo, useCallback } from "react";

/*
  { label: "Traditional Arabic", value: "TraditionalArabic" },
  { label: "Tahoma Arabic", value: "TahomaArabic" },
  { label: "Dubai", value: "Dubai" },
  { label: "Cairo", value: "Cairo" },

  // هنری
  { label: "Diwani", value: "Diwani" },
  { label: "Thuluth", value: "Thuluth" },
  { label: "Kufi", value: "Kufi" },
  { label: "Noto Nastaliq Urdu", value: "NotoNastaliqUrdu" },


*/
const fonts = [
  // فارسی
  { label: "وزیر", value: "Vazir" },
  { label: "شبنم", value: "Shabnam" },
  { label: "صمیم", value: "Samim FD" },
  { label: "ایران‌سنس", value: "IRANSans" },
  { label: "امیری (فارسی)", value: "Amiri fa" },
  { label: "القلم قرآن", value: "Al Qalam" },
  { label: "نستعلیق", value: "IranNastaliq" },

  // Arabic
  { label: "Amiri (عربی)", value: "Amiri" },
  { label: "Scheherazade", value: "Scheherazade New" },
  { label: "Noto Naskh Arabic", value: "Noto Naskh Arabic" },
  { label: "Noto Kufi Arabic", value: "Noto Kufi Arabic" },
];

function FontModal() {
  const { setOpenFontModal, setFontFamily, fontSize, setFontSize } = useFont();

  const onClose = useCallback(
    () => setOpenFontModal(false),
    [setOpenFontModal]
  );

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setFontSize(toEnglishDigits(e.target.value)),
    [setFontSize]
  );

  const onSelectChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => setFontFamily(e.target.value),
    [setFontFamily]
  );

  return (
    <MyModal onClose={onClose} contentSize="sm">
      <div className="space-y-6 w-70 mx-auto">
        <div>
          <LabelWithDot htmlFor="fontSize">اندازه فونت</LabelWithDot>
          <InputField
            id="fontSize"
            placeholder={`مثال : ${fontSize}`}
            value={fontSize}
            onChange={onChange}
          />
        </div>

        <div>
          <LabelWithDot htmlFor="fontFamily">اسم فونت</LabelWithDot>
          <SelectField
            id="fontFamily"
            options={fonts}
            onChange={onSelectChange}
          />
        </div>
      </div>
    </MyModal>
  );
}

export default memo(FontModal);
