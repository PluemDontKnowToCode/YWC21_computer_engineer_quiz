type BitTipProps = {
  text: string;
};

export default function BitTip({ text }: BitTipProps) {
  return (
    <div className="bit-note">
      <span>KEY IDEA</span> {text}
    </div>
  );
}
