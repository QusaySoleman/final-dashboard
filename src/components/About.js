// by Mouaed
import React from "react";
import "./about.css";
import ImagesInput from "./ImagesInput";
const xww = () => {
  console.log(ImagesInput.selectedImages);
};
const About = () => {
  return (
    <div>
      <div className="wraber p-2">
        <h1 className="myh1">تعديل معلومات الصفحة</h1>
        <form onSubmit="" target="">
          <div className="part">
            <div className="laple">
              {" "}
              <p className="myp">التاسيس:</p>
            </div>
            <div className="f1input">
              {" "}
              <textarea
                className="inputw"
                type="text"
                id="input1"
                onChange={xww}
              ></textarea>{" "}
            </div>
          </div>
          <div className="part">
            <div className="laple">
              {" "}
              <p className="myp">قطاع البلدية:</p>
            </div>
            <div className="f1input">
              {" "}
              <textarea
                className="inputw"
                type="text"
                id="input2"
              ></textarea>{" "}
            </div>
          </div>

          <div className="part">
            <div className="laple">
              <p className="myp">الرؤية:</p>
            </div>
            <div className="f1input">
              {" "}
              <textarea
                type="text"
                className="inputw"
                id="input3"
              ></textarea>{" "}
            </div>
          </div>

          <div className="part">
            <div className="laple">
              <p className="myp">الاهداف:</p>
            </div>
            <div className="f1input">
              {" "}
              <textarea
                type="text"
                className="inputw"
                id="input4"
              ></textarea>{" "}
            </div>
          </div>
          <div className="part">
            <div className="laple">
              <p className="myp">الصور:</p>
            </div>
            <div className="f1input2">
              {" "}
              <ImagesInput />
            </div>
            <div class="grid-container">
              <div class="grid-item item1">
                <div>1</div>
              </div>
              <div class="grid-item item2">2</div>
              <div class="grid-item item3">3</div>
              <div class="grid-item item4">4</div>
            </div>
          </div>
          <div className="but2">
            <button type="" className="bu1">
              {" "}
              حفظ التعديلات
            </button>
            <button type="reset" className="bu2">
              الغاء التعديلات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default About;
