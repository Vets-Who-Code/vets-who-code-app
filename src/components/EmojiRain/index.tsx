const EmojiRain = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: 100 }).map((_, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}vw`,
            top: `-${Math.random() * 100}vh`,
            animation: 'fall 5s linear forwards',
          }}
        >
          🎖️
        </div>
      ))}
    </div>
  );
};

export default EmojiRain;
