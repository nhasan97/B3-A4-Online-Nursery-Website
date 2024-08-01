const Masonry = ({
  images,
  gap,
}: {
  images: {
    path: string;
    name: string;
  }[];
  gap: number;
}) => {
  return (
    <div className=" columns-2 md:columns-3 xl:columns-5 gap-0 rounded-[48px] overflow-hidden">
      {images.map((image, i) => (
        <div
          style={{ width: "100%", display: "block", padding: gap / 2 }}
          className="w-fit flex flex-col items-center relative"
        >
          <img key={i} src={image.path} alt="" className="w-full" />
          <div
            //right-[${ gap / 2}px] bottom-[${gap / 2}px]

            className={`w-[calc(100%-5px)] p-1 text-base sm:text-lg text-white text-center sm:font-medium bg-[#98b29969] backdrop-blur-[0px] absolute bottom-[2.5px]`}
          >
            <p>{image.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Masonry;
