function Avatar({ src }) {
  return (
    <div className="rounded-full overflow-hidden w-12 border-2 border-twitterBorder">
      <img src={src} alt="avatar" />
    </div>
  );
}

export default Avatar;
