import React, { useRef, useState, useEffect } from "react";
import { MdOutlineSmartDisplay } from "react-icons/md";
import { MdPausePresentation } from "react-icons/md";
import { CiSquareInfo, CiImageOn } from "react-icons/ci";
import { GoVideo } from "react-icons/go";
import Build from "../components/model/Build";
import ArtWorkInfo from "../components/model/ArtWorkInfo";
import ArtWorkName from "../components/model/ArtWorkName";
import useModal from "../components/hooks/useModel";
const Project = () => {
  const {
    open: modal1Open,
    handleOpen: handleOpen1,
    handleClose: handleClose1,
  } = useModal();
  const {
    open: modal2Open,
    handleOpen: handleOpen2,
    handleClose: handleClose2,
  } = useModal();
  const {
    open: modal3Open,
    handleOpen: handleOpen3,
    handleClose: handleClose3,
  } = useModal();
  const [imgPreview, setImgPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [artWorkName, setArtWorkName] = useState(null);

  const [videoShow, setVideoShow] = useState(false);
  const [imageShow, setImageShow] = useState(false);
  const [bothUpload, setBothUplaod] = useState(false);
  const [videoKey, setVideoKey] = useState(0);

  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const handlePublish = () => {
    if (artWorkName) {
      handleOpen3();
    } else {
      handleOpen2();
    }
  };
  useEffect(() => {
    if (imgPreview && videoKey) {
      setBothUplaod(true);
    }
  }, [imgPreview, videoKey]);
  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleVideoClick = () => {
    videoInputRef.current.click();
  };
  const handleImageDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      if (droppedFile.type.startsWith("image/")) {
        handleFileChange(droppedFile);
      } else {
        console.log("Please drop a image file.");
      }
    }
  };
  const handleFileChange = (selectedFile) => {
    if (selectedFile) {
      const maxFileSize = 1048576;
      if (selectedFile.size <= maxFileSize) {
        console.log(URL.createObjectURL(selectedFile));
        setImgPreview(URL.createObjectURL(selectedFile));
        setImageShow(true);
      } else {
        console.log(
          "Selected file is too large. Please select a file less than or equal to 1MB."
        );
      }
    }
  };

  const handleVideoDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      if (droppedFile.type.startsWith("video/")) {
        handleVideoChange(droppedFile);
      } else {
        console.log("Please drop a video file.");
      }
    }
  };

  const handleVideoChange = (selectedFile) => {
    if (selectedFile) {
      const maxFileSize = 10485760;
      if (selectedFile.size <= maxFileSize) {
        const videoURL = URL.createObjectURL(selectedFile);
        console.log(videoURL);
        setVideoPreview(videoURL);
        setVideoShow(true);
        setVideoKey((prevKey) => prevKey + 1);
      } else {
        console.log(
          "Selected file is too large. Please select a file less than or equal to 10MB."
        );
      }
    }
  };

  return (
    <div className="profile">
      <div className="container-fluid m-0 g-0 p-0">
        <div className="row">
          <div className="parentWork">
            <div className="work1">
              <div className="sample1">
                <span className="iconsSet">
                  {true ? (
                    <MdPausePresentation fontSize={30} />
                  ) : (
                    <MdOutlineSmartDisplay fontSize={30} />
                  )}
                </span>
              </div>
              <div className="sample1" onClick={handleOpen1}>
                <span className="iconsSet ">
                  <CiSquareInfo fontFamily={30} />
                </span>
                <span className="workInfo">Artwork Info</span>
              </div>
              <div className="sample1">
                <form className=" row ">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Artwork Name"
                    onChange={(e) => setArtWorkName(e.target.value)}
                  />
                </form>
              </div>
            </div>
            <div className="work2">
              <button className="btn btn-success">Save</button>
              <button
                className="btn btn-danger"
                disabled={!bothUpload}
                onClick={handlePublish}
              >
                Publish
              </button>
            </div>
          </div>
        </div>

        <div className="row  ">
          <div
            className="parentUpload"
            style={{ height: bothUpload && "100%" }}
          >
            <div
              className="upload1"
              style={{ flexDirection: bothUpload && "row" }}
              onClick={handleClick}
              onDragOver={(event) => event.preventDefault()}
              onDrop={handleImageDrop}
            >
              <div className="img1">
                {imageShow ? (
                  <img
                    src={imgPreview}
                    alt="preview"
                    height="250"
                    width="170"
                  />
                ) : (
                  <CiImageOn fontSize={90} />
                )}
              </div>
              <div className="img1">
                <h6>
                  Add <b>image</b> / <b>artwork</b> to be recognized{" "}
                </h6>
              </div>
              <div className="img1">
                <button className="btn btn-outline-secondary">
                  {imageShow ? "Change file" : " Select File"}
                </button>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple={false}
                ref={fileInputRef}
                onChange={(e) => handleFileChange(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <div
              className="upload2 "
              style={{ flexDirection: bothUpload && "row" }}
              onClick={handleVideoClick}
              onDragOver={(event) => event.preventDefault()}
              onDrop={handleVideoDrop}
            >
              <div className="img1">
                {videoShow ? (
                  <video
                    key={videoKey}
                    width="170"
                    height="250"
                    autoPlay
                    muted
                    loop
                  >
                    <source src={videoPreview} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <GoVideo fontSize={90} />
                )}
              </div>
              <div className="img1">
                <h6>
                  Add <b>Video</b>
                </h6>
              </div>
              <div className="img1">
                <button className="btn btn-outline-secondary">
                  {videoShow ? "Change file" : " Select File"}
                </button>
              </div>
              <input
                type="file"
                accept="video/*"
                multiple={false}
                ref={videoInputRef}
                onChange={(e) => handleVideoChange(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
          </div>
          {bothUpload && (
            <div className="buildProject">
              <div className="projectSetUp">
                <img src={imgPreview} alt="imgPreview" />
                <video key={videoKey} autoPlay muted loop>
                  <source
                    src={videoPreview}
                    type="video/mp4"
                    className="w-set"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}
        </div>
      </div>
      <Build
        open={modal3Open}
        handleClose={handleClose3}
        handleOpen={handleOpen3}
        imgPreview={imgPreview}
      />
      <ArtWorkInfo
        open={modal1Open}
        handleClose={handleClose1}
        handleOpen={handleOpen1}
      />
      <ArtWorkName
        setArtWorkName={setArtWorkName}
        artWorkName={artWorkName}
        open={modal2Open}
        handleOpen={handleOpen2}
        handleClose={handleClose2}
        handleOpen3={handleOpen3}
      />
    </div>
  );
};

export default Project;
