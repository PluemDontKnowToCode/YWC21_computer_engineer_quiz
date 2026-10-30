type BitLessonHeadingProps = {
  title: string;
};

export default function BitLessonHeading({ title }: BitLessonHeadingProps) {
  return (
    <div className="section-heading">
      <div className="section-number violet">02</div>
      <div>
        <div className="eyebrow">LOW-LEVEL LOGIC</div>
        <h2>{title}</h2>
      </div>
    </div>
  );
}
