import Picture from "./../models/PictureModel.js";

const initialData = () => {
  const data = {
    pictures: [
      {
        url: "https://cdn.pixabay.com/photo/2022/03/12/19/14/sea-7064686_960_720.jpg",
        alt: "sunset",
        credits: "Gorge W Bosh",
      },
      {
        url: "https://cdn.pixabay.com/photo/2021/12/21/08/29/owl-6884773_960_720.jpg",
        alt: "owl",
        credits: "Jessica Rabbit",
      },
      {
        url: "https://cdn.pixabay.com/photo/2022/02/26/07/06/butterfly-7035308_960_720.jpg",
        alt: "butterfly",
        credits: "Tyra Banks",
      },
    ],
  };

  const pictures = data.pictures.map((picture, index, pictures) => {
    return new Picture(picture, pictures);
  });
  return { pictures };
};

export default initialData;
