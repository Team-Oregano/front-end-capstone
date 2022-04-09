/* eslint-disable max-len */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React, {
  useState,
  useEffect,
  useContext,
  Component,
} from 'react';
import axios from 'axios';
import './style.css';
import ProductInfo from './ProductInfo';
import AddToCart from './AddToCart';
import ImageGallery from './ImageGallery';
import StyleSelector from './StyleSelector';

function Overview() {
  const [productId, setProductId] = useState(Math.floor(Math.random() * (38321 - 37311) + 37311));
  // const [productId, setProductId] = useState(productId)
  const [styles, setStyles] = useState([]);
  const [description, setDescription] = useState([]);
  const [count, setCount] = useState(0);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const [resultCount, setResultCount] = useState(0);
  const [styleSelector, selectStyleSelector] = useState(0);

  useEffect(() => {
    axios
      .get(`/products/${productId}/styles`)
      .then((res) => setStyles(res.data.results))
      .catch((err) => console.error(err));
  }, [productId]);

  useEffect(() => {
    axios
      .get(`/products/${productId}`)
      .then((res) => setDescription(res.data))
      .catch((err) => console.error(err));
  }, [productId]);

  return (
    <div className="ov-overview">
      <div className="ov-gallery">
        <ImageGallery styles={styles} count={count} setCount={setCount} />
      </div>
      <div className="ov-cart">
        <ProductInfo styles={styles} description={description} styleSelector={styleSelector} selectStyleSelector={selectStyleSelector}/>
        <StyleSelector styles={styles} styleSelector={styleSelector} selectStyleSelector={selectStyleSelector} setCount={setCount}/>

        <AddToCart styles={styles} count={count} setCount={setCount} resultCount={resultCount} setResultCount={setResultCount} styleSelector={styleSelector}/>
      </div>
      <div className="ov-description">
        {/* Extract to component */}
        <span className="ov-description-details">
          <h5>{description.slogan}</h5>
          <p>{description.description}</p>
        </span>
        <span className="ov-description-ul">
          <ul>
            <li>GMO and Pesticide-free</li>
            <br />
            <li>Made with 100% Genetic Modification</li>
            <br />
            <li> This is 100% Made up</li>
          </ul>
        </span>
      </div>
      {/* End Extraction */}
    </div>
  );
}

export default Overview;
