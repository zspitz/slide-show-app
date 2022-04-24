import { CARDS_CONTAINER } from "../services/domService.js";

const renderCards = pictures => {
  pictures.map(pic => {
    const { _id, url, alt, price, credits } = pic;
    CARDS_CONTAINER.innerHTML += `
    <div class="card mb-2 px-0 col-12 col-md-6 col-xl-4 col-xxl-3">
    <img
      src="${url}"
      class="card-img-top"
      alt="${alt}"
    />
    <div class="card-body">
      <h5 class="card-title">${alt}</h5>
      <p>Credits: <span class="fw-bold">${credits}</span></p>
      <hr />
      <div class="justify-content-between d-flex">
        <div class="card-text">
          Price: <span class="fw-bold">${price}</span>$
        </div>
        <div class="bi bi-cart cursor" id="like${_id}"></div>
      </div>
    </div>
  </div>
    `;
  });
};

export default renderCards;
