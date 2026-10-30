import NumberConverter from "../number-converter";
import LessonLayout from "../../components/layout/lesson-layout";

export default function NumberConversionPage() {
  return (
    <LessonLayout
      lesson="convert"
      kicker="NUMBER CONVERSION"
      intro="Convert one unsigned 8-bit value between decimal, hexadecimal, and binary. Leading zeros change the written form, not the value."
    >
      <NumberConverter />
    </LessonLayout>
  );
}
