// by Mouaed
import React, { useState } from "react";
import "./imageinput.css";

const Imagesinput = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
     
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    // FOR BUG IN CHROME
    event.target.value = "";
  };

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  return (
    <section className="mysection1">
      <label className="mylabel2">
        + Add Images
        <br />
        <span>up to 4 images</span>
        <input className="myinput12"
          type="file"
          name="images"
          onChange={onSelectFile}
          multiple
          accept="image/png , image/jpeg, image/webp"
        />
      </label>
      <br />

      <input type="file" multiple  className="myinput12"/>

      {selectedImages.length > 0 &&
        (selectedImages.length > 4 ? (
          <p className="error">
            You can't upload more than 4 images! <br />
            <span>
              please delete <b> {selectedImages.length - 4} </b> of them{" "}
            </span>
          </p>
        ) : (
            <div></div>
         /*  <button
              className="upload-btn"
              onClick={() => {
                console.log(selectedImages);
              }}
              >
              UPLOAD {selectedImages.length} IMAGE
              {selectedImages.length === 1 ? "" : "S"}
            </button>*/
          ))}
  
      <div className="images " >
        {selectedImages &&
          selectedImages.map((image, index) => {
            return (
              <div key={image} className="image">
                <img src={image} height="100" width="100" alt="upload" className="myimg12"/>
                <button onClick={() => deleteHandler(image)}>
                  &times;
                </button>
                <div className="pindex">{index + 1}</div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Imagesinput;