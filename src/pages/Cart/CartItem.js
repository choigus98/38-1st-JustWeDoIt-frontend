import Product from 'pages/ProductList/Product/Product';
import React, { useEffect, useState } from 'react';

import { AiOutlineHeart } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';

const CartItem = ({
  cartItem,
  deleteFetch,
  priceToString,
  setCartItemList,
}) => {
  const {
    cartId,
    stockId,
    productName,
    price,
    buyingQuantity,
    size,
    category,
    special,
    gender,
    thumbnailImage,
    stockInfo,
  } = cartItem;
  const [sizeSelected, setSizeSelected] = useState(size);
  const [stockSelected, setStockSelected] = useState(buyingQuantity);

  // useEffect(() => {
  //   fetch('http://10.58.52.246:3000/carts/1', {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       cartId: cartId,
  //       buyingQuantity: stockSelected,
  //       stockId: stockId,
  //     }),
  //   })
  //     .then(response => response.json())
  //     .then(result => setCartItemList(result.data));
  // }, []);

  const sizeStockHandler = e => {
    e.target.className === 'sizeSelector'
      ? setSizeSelected(Number(e.target.value))
      : setStockSelected(Number(e.target.value));

    updateFetch();
    console.log(sizeSelected);
  };
  console.log(sizeSelected);
  const updateFetch = () => {
    fetch('http://10.58.52.214:3000/carts/1', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartId: cartId,
        buyingQuantity: stockSelected,
        stockId: stockId,
        newSize: sizeSelected,
      }),
    })
      .then(response => response.json())
      .then(result => setCartItemList(result.data));
  };
  return (
    <>
      <div className="cartItemContainer">
        <div className="cartItemImage">
          <figure>
            <a>
              <img src={thumbnailImage} alt={productName} />
            </a>
          </figure>
        </div>

        <div className="cartItemDesc">
          <p>{productName}</p>
          <div>{gender}</div>
          <div>{category}</div>
          <div>{special}</div>
          <div className="itemHandler">
            <div>
              사이즈 :
              <select
                className="sizeSelector"
                onChange={sizeStockHandler}
                value={sizeSelected}
              >
                {Object.entries(stockInfo).map(
                  ([productSize, productStock]) =>
                    productStock !== 0 && (
                      <option value={productSize} key={productSize}>
                        {productSize}
                      </option>
                    )
                )}
                {/* {sizeArr.map(
                  (productSize, index) =>
                    stockArr[index] !== 0 && (
                      <option value={productSize} key={productSize}>
                        {productSize}
                      </option>
                    )
                )} */}
              </select>
            </div>
            <div>
              수량 :
              <select
                className="stockSelector"
                onChange={sizeStockHandler}
                value={stockSelected}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </select>
            </div>
          </div>
          <div>
            <ul>
              <AiOutlineHeart />
              <BsTrash
                onClick={() => {
                  deleteFetch(stockId);
                }}
              />
            </ul>
          </div>
        </div>
        <div className="cartItemRightWrap">
          <span>{priceToString(price * stockSelected)}원</span>
        </div>
      </div>
      <div className="cartItemFooter">
        <p>무료배송</p>
        <p>도착 예정일 : 10월 28일(금) - 10월 31일(월)</p>
      </div>
    </>
  );
};

export default CartItem;
