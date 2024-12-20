const AuthCarousel = ({img,title,desc}) => {
  return (
      <div className="!flex flex-col items-center justify-center h-full mb-10">
        <img
          src={img}
          alt=""
          className="w-[600px] h-[500px] pt-10"
        />
        <h3 className="text-4xl text-black text-center font-bold">
          {title}
        </h3>
        <p>{desc}</p>
      </div>
  );
};

export default AuthCarousel;
