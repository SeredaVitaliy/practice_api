'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}
const getCountryData = function (country) {
  const request = new XMLHttpRequest(); //далее нам нужжен url по которому будем выполнять вызов ajax
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`); //1 - тип запроса(для получения данных get, 2 - строка, содержащаяь url адрес, по которому должен быть выполнен вызов ajax)

  //отправление запроса
  request.send();

  //регистрация обратного вызова объекта запроса для события загрузки
  request.addEventListener('load', function () {
    //   console.log(this.responseText);

    //преобразование json в реальный объект js
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `<article class="country">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${
              Object.values(data.languages)[0]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.values(data.currencies)[0].name
            }</p>
          </div>
        </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('russia');
getCountryData('usa');
getCountryData('germany');
getCountryData('kazakhstan');
