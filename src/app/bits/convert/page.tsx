import NumberConverter from "../number-converter";
import LessonLayout from "../../components/lesson-layout";

export default function NumberConversionPage() {
  return (
    <LessonLayout
      lesson="convert"
      kicker="NUMBER CONVERSION"
      intro="Translate the same 8-bit value across decimal, hexadecimal, and binary."
    >
      <NumberConverter />
    </LessonLayout>
  );
}
