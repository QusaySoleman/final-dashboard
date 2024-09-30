//by rama
import React, { useState } from 'react';
import './Content.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Content = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
  
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage({
          name: file.name,
          size: (file.size / 1024 / 1024).toFixed(1)
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  

  return (
    <div className="container">
    <div className="content">
      {isEditing ? (
        <div className="form-news">
          <h5 className='text-black'>تعديل الخبر</h5>
          <form>
            <div className="row">
              <div className="col-md-1">
                <label>العنوان:</label>
              </div>
              <div className="col-md-11">
                <input type="text" className="form-control" defaultValue="تحسينات كبيرة تطال خدمات النقل العمومي في المنطقة" />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-1">
                <label>التاريخ:</label>
              </div>
    
              <div className="col-md-5 ">
                <select className="form-control date">
                  <option>23/نيسان/2024</option>
                </select>
      
    
              </div>
            </div>
            <div className="row mt-3 ">
              <div className="col-md-1">
                <label>النص:</label>
              </div>
              <div className="col-md-11 ">
                <textarea className="form-control" rows="3"defaultValue=" بفخر نعلن عن تحسينات كبيرة في خدمة النقل العام في مدينتنا. تم توسيع شبكة الحافلات وتحسين جودة الخدمة لضمان وصول سريع ومريح للمسافرين إلى وجهاتهم. تم تصميم الجدول الزمني للحافلات بعناية لتلبية احتياجات المواطنين، مع زيادة عدد الرحلات خلال فترات الذروة وفقًا للطلب العام. كما تم تجهيز الحافلات بأحدث التقنيات لراحة الركاب، بما في ذلك مقاعد مريحة وتكييف هواء فعال. نحن ملتزمون بتوفير خدمة النقل العام الممتازة التي تعزز التنقل المريح والمستدام لجميع سكان المدينة."></textarea>
              </div>
            </div>
            <div className="row mt-3">
            <div className="col-md-1">
              <label>الصور:</label>
            </div>
            <div className="col-md-11">
              <div className="image-upload">
                <div className="  p-3 border  rounded">
                <div className='align-items-start '>  <label htmlFor="image-upload-input" className="add-image-btn text-primary align-text-start text-underline-primary">إضافة صورة</label></div>
                 <div className="d-flex flex-column align-items-center"><img src="Group 8.png" alt="صورة" /></div>
                </div>
                <input id="image-upload-input" type="file" className="form-control d-none" onChange={handleImageChange} />
                {selectedImage && (
                  <>
                    <div className="image-preview">
                      <img src={selectedImage.src} alt={selectedImage.name} />

                      <div>
                        <span>{selectedImage.name}</span><br />
                        <span>{selectedImage.size} ميجابايت</span>
                      </div>
                      <button type="button" className="btn btn-danger ml-2" onClick={handleRemoveImage}>×</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
            <div className="custom-gap d-flex justify-content-center mt-3">
            <button type="submit" className="btn1 btn btn-primary p-3 col-4 ml-2 text-light" onClick={handleCancelClick}>حفظ التعديلات</button>
              <button type="button" className="btn btn-outline-danger p-3 col-4 ml-2" onClick={handleCancelClick}>إلغاء</button>
             
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className="form-news mb-4">
            <h2>إضافة خبر جديد</h2>
            <form>
              <div className="row">
                <div className="col-md-1">
                  <label>العنوان:</label>
                </div>
                <div className="col-md-11">
                  <input type="text" className="form-control" placeholder="يجب ألا يتجاوز العنوان 50 حرف" />
                </div>
              </div>
              <div className=" date-input row mt-3">
                <div className="col-md-1 ">
                  <label type="date ">التاريخ:</label>
             
                </div>
                <div className="col-md-5 ">
                <select id="date-input" class="form-select align-text-end">
                  <option selected>يوم/شهر/سنة</option>
                   <option>16/أيلول/2024</option>
                   <option>15/أيلول/2024</option>
                 
                   </select>



                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-1">
                  <label>النص:</label>
                </div>
                <div className="col-md-11">
                  <textarea className="form-control" rows="3" placeholder="يجب ألا يتجاوز النص 200 حرف"></textarea>
                </div>
              </div>
              <div className="row mt-3">
            <div className="col-md-1">
              <label>الصور:</label>
            </div>
            <div className="col-md-11">
              <div className="image-upload">
                <div className="  p-3 border  rounded">
                <div className='align-items-start '>  <label htmlFor="image-upload-input" className="add-image-btn text-primary align-text-start text-underline-primary">إضافة صورة</label></div>
                 <div className="d-flex flex-column align-items-center"><img src="Group 8.png" alt="صورة" /></div>
                </div>
                <input id="image-upload-input" type="file" className="form-control d-none" onChange={handleImageChange} />
                {selectedImage && (
                  <>
                    <div className="image-preview">
                      <img src={selectedImage.src} alt={selectedImage.name} />

                      <div>
                        <span>{selectedImage.name}</span><br />
                        <span>{selectedImage.size} ميجابايت</span>
                      </div>
                      <button type="button" className="btn btn-danger ml-2" onClick={handleRemoveImage}>×</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
              <div className="custom-gap  d-flex justify-content-center mt-3 d-grid  ">
                <button type="submit" className="btn1 btn btn-primary p-3 col-4 ml-2 text-light rounder"onClick={handleCancelClick}>نشر الخبر</button>
                <button type="reset" className="btn ml-2 btn-outline-danger p-3 col-4 "onClick={handleCancelClick}>إلغاء</button>
              </div>
            </form>
          </div>
          <br/>
          <br/>
          <br/>
          <h4 className="line mt-5 mr-5 mb-10 fw-bold">الأخبار السابقة</h4>
          <div>
          
          <div className="news-card ">
            <div className="news-card-header ">
              <div className='d-flex justify-content-end gap-3'>
              <span className='btn1  text-light'><button className="btn btn1 text-light" onClick={handleEditClick}  >تعديل</button></span>
                <button className="btn btn-outline-danger ">حذف</button>
              </div>
            </div>
            <div className="d-flex ">
              <img src="Rectangle 1.png" alt="خبر" />
              <div className="news-card-content justify-content-end mr-3">
              <h5 className='colors '>تحسينات كبيرة تطال خدمات النقل العمومي في المنطقة    </h5><br/>
                <p className="text-muted "> .23/نيسان/2024</p>
                <p className='paragraph fw-bold'>
                بفخر نعلن عن تحسينات كبيرة في خدمة النقل العام في مدينتنا. تم توسيع شبكة الحافلات وتحسين جودة الخدمة لضمان وصول سريع ومريح للمسافرين إلى وجهاتهم. تم تصميم الجدول الزمني للحافلات بعناية لتلبية احتياجات المواطنين، مع زيادة عدد الرحلات خلال فترات الذروة وفقًا للطلب العام. كما تم تجهيز الحافلات بأحدث التقنيات لراحة الركاب، بما في ذلك مقاعد مريحة وتكييف هواء فعال. نحن ملتزمون بتوفير خدمة النقل العام الممتازة التي تعزز التنقل المريح والمستدام لجميع سكان المدينة.
                </p>
              </div>
            </div>
            
          </div>
          <div>
          <div className="news-card ">
            <div className="news-card-header ">
              <div className='d-flex justify-content-end gap-3'>
              <span className='btn1  text-light'><button className="btn btn1 text-light" onClick={handleEditClick}  >تعديل</button></span>
                <button className="btn btn-outline-danger ">حذف</button>
              </div>
            </div>
            <div className="d-flex roun ">
              <img src="image.png" alt="خبر" />
              <div className="news-card-content justify-content-end mr-3">
              <h5 className='colors'>انطلاق مبادرة "مأكولات صحية للجميع"  </h5><br/>
                <p className="text-muted "> .6/نيسان/2024 </p>
                <p className='paragraph fw-bold'>
                نحن سعداء بالإعلان عن إطلاق برنامج "مأكولات صحية للجميع". الذي يهدف إلى تعزيز التغذية الصحية في مجتمعنا.
                  سنقوم بتوفير وجبات غذائية متوازنة ومغذية للعائلات ذات الدخل المحدود، بالتعاون مع مطاعم ومنظمات محلية. سيستفيد الأطفال  وكبار السن والأفراد ذوي الحاجة من هذه البرامج الغذائية المجانية. نهدف إلى تحسين صحة المجتمع وتعزيز جودة حياتهم.انضموا إلينا في هذه المبادرة الهامة لتحقيق تغذية صحية للجميع!
                </p>
              </div>
            </div>
            </div>
          </div>
          </div>
        </>
      )}
    </div>
    </div>
  );
};

export default Content;
