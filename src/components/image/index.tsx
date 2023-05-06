import React, { useContext, useState } from 'react';
import styles from './index.less';

export default (props:any) => {

  const {imgPath, width} = props;

  const [showImg, setShowImg] = useState(false);

  const showImgMask = () => {
    setShowImg(true);
  };

  const hideImgMask = () => {
    setShowImg(false);
  };


  return (
    <>
     <img src={imgPath} width={width || 130} height={width ? 'auto' : 98} onClick={showImgMask} />
     {
       showImg && <div onClick={hideImgMask} className={styles.mask}>
        <img src={imgPath} className={styles.img} /> 
       </div>
     }
    </>
  )
} 
