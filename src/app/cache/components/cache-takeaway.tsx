export default function CacheTakeaway() {
  return (
    <div className="takeaway">
      <div className="takeaway-icon">✦</div>
      <div>
        <strong>A quick way to remember</strong>
        <p>FIFO tracks <em>arrival</em>. LRU tracks <em>recent use</em>. MIN looks ahead; LFU counts <em>frequency</em>.</p>
      </div>
    </div>
  );
}
