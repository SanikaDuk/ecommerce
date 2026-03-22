const MarqueeStrip = () => {
  const items = [
    'FREE DELIVERY ON ORDERS ABOVE ₹999',
    'HANDPICKED STYLES',
    'NEW ARRIVALS WEEKLY',
    'PREMIUM QUALITY FABRICS',
    'CRAFTED WITH CARE',
  ];

  const text = items.join('  •  ');

  return (
    <div
      className="py-3 overflow-hidden whitespace-nowrap"
      style={{
        background: 'linear-gradient(90deg, #8B6914, #5C3D1E)',
      }}
    >
      <div className="animate-marquee inline-block">
        <span className="font-mono text-[11px] tracking-[0.2em] text-[#FFF8E7]">
          {text}  •  {text}  •  
        </span>
      </div>
    </div>
  );
};

export default MarqueeStrip;
