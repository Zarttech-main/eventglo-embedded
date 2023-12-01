const EventGloEmbed = (() => {
  /** @type {string} */
  let publisherId;
  /** @type {number} */
  let template;
  /** @type {HTMLElement} */
  let parentElement;
  let loaderState;
  const pager = {
    page: 0,
    pageSize: 12,
    totalSize: 0,
    items: [],
  };
  const BASE_URL = 'https://app.eventglo.io';
  const API_URL = 'https://api.eventglo.io/api/Event';
  const styles = `.eventglo-embed-container{width:100%;max-width:1200px;margin:0 auto;position:relative}.eventglo-embed{line-height:20px;font-weight:400;font-size:15px;display:flex;flex-wrap:wrap;width:100%;min-height:24em}.eventglo-embed *{box-sizing:border-box}.eventglo-embed>*{max-width:100%;padding:0 .75rem;flex:0 0 auto;width:100%;margin-bottom:1rem}@media screen and (min-width:576px){.eventglo-embed>*{flex:0 0 auto;width:50%}}@media screen and (min-width:768px){.eventglo-embed>*{flex:0 0 auto;width:33.3333%}}@media screen and (min-width:1200px){.eventglo-embed>*{flex:0 0 auto;width:25%}}.eventglo-embed .embed-card{display:flex;flex-direction:column;background-clip:border-box;word-wrap:break-ord;font-family:Roboto,Verdana,sans-serif;border:0;border-radius:0;box-shadow:0 2px 10px 0 #008cfe1a;min-height:24em;position:relative;width:100%}.eventglo-embed .embed-card *{margin:0;padding:0;box-sizing:border-box}.eventglo-embed .embed-card .card-body{flex:1 1 auto;padding:1rem}.eventglo-embed .embed-card img{max-width:100%}.eventglo-embed .embed-card .card-img,.eventglo-embed .embed-card .card-img-bottom,.eventglo-embed .embed-card .card-img-top{border-radius:0}.eventglo-embed .embed-card .content-details{max-width:85%}.eventglo-embed .embed-card>.card-title{padding:1rem}.eventglo-embed .embed-card>.card-title,.eventglo-embed .embed-card>.card-title h1,.eventglo-embed .embed-card>.card-title p{margin-bottom:0}.eventglo-embed .embed-card .content{width:100%;display:flex;justify-content:space-between}.eventglo-embed .embed-card .content+.cta-embed-pane{padding-top:.75rem}.eventglo-embed .embed-card .content-title{font-size:1rem;font-weight:700;margin-bottom:.5rem;text-transform:capitalize}.eventglo-embed .content small,.eventglo-embed .embed-card .content-title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%}.eventglo-embed .embed-card>.content-title{padding:1rem 1rem 0 1rem}.eventglo-embed .embed-card .content-subtitle{font-size:.8rem;font-weight:400;margin-bottom:1rem}.eventglo-embed .embed-card .content-details .content-label{display:flex;align-items:center;max-width:100%;overflow:hidden}.eventglo-embed .embed-card .content-details .content-label:not(:last-child){margin-bottom:.75rem}.eventglo-embed .embed-card .content-details .content-label img,.eventglo-embed .embed-card .content-details .content-label svg{width:12px;margin-right:.5rem}.eventglo-embed .embed-card .content-details .content-label small{font-size:.75rem}.eventglo-embed .embed-card .content-date{font-size:1.5rem;font-weight:700;align-self:center}.eventglo-embed .embed-card .content-date p:first-child{font-size:1.25rem;font-weight:400}.eventglo-embed .embed-card .content-date *{margin-top:0;margin-bottom:10px}.eventglo-embed .embed-card .cta-embed-pane{text-align:center}.eventglo-embed .embed-card .cta-embed-pane .embed-cta-btn{display:inline-block;width:100%;max-width:80%;border:1px solid var(--brand-color);border-radius:8px;color:var(--brand-color);background-color:#fff;cursor:pointer;padding:.35rem .75rem;text-decoration:none;font-size:1rem;transition:transform .3s ease-in-out}.eventglo-embed .embed-card .cta-embed-pane .embed-cta-btn:hover{transform:translateY(-1px)}.eventglo-embed .embed-card .cta-embed-pane .embed-cta-btn span{font-weight:500}.eventglo-embed .embed-card .content-image{width:8em;max-width:8em;height:10em;margin-right:.5rem;border-radius:8px;overflow:hidden}.eventglo-embed .embed-card .content-image img{width:100%;height:100%;border-radius:8px;object-fit:cover}.eventglo-embed .embed-card .two-line-overflow-ellipsis{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;line-clamp:2;-webkit-line-clamp:2;-webkit-box-orient:vertical;min-height:calc(2rem + 5px)}.eventglo-embed .embed-card .card-body>.content-subtitle{margin-bottom:.5rem}.eventglo-embed .embed-card>.cta-embed-pane{align-self:flex-end;width:100%;padding:0 1rem 1rem 1rem}.eventglo-embed .embed-card .card-img,.eventglo-embed .embed-card .card-img-bottom,.eventglo-embed .embed-card .card-img-top{border-radius:0!important;height:10em;overflow:hidden;max-width:100%}.eventglo-embed .embed-card .card-img img,.eventglo-embed .embed-card .card-img-bottom img,.eventglo-embed .embed-card .card-img-top img{width:100%;height:100%;object-fit:cover;object-position:center}.eventglo-embed-container #eventglo-loader{position:absolute;left:0;right:0;top:0;bottom:0;background-color:rgba(255,255,255,.8);justify-content:center;align-items:center;width:100%;z-index:600;display:none}.eventglo-embed-container #eventglo-loader.show{display:flex}.eventglo-embed-container #eventglo-loader span{display:inline-block;font-family:Roboto,Verdana,san-serif;font-weight:700;font-size:1rem;color:#303030}.eventglo-embed .tag{color:#fff;position:absolute;font-size:12px;font-weight:400;right:0;top:1px;display:inline-block;padding:2px 10px 2px 22px!important;border-top-left-radius:20px;border-bottom-left-radius:20px;background-color:red}.eventglo-embed .tag::before{content:'';display:inline-block;width:8px;height:8px;border-radius:50%;border:1px sold #fff;background-color:#fff;position:absolute;left:10px;top:50%;transform:translateY(-50%)}`;
  const icons = {
    location: `<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.0799 7.37334C10.0799 8.52 9.15326 9.45334 7.99992 9.45334C6.84659 9.45334 5.91992 8.52667 5.91992 7.37334C5.91992 6.22 6.85326 5.29333 7.99992 5.29333C8.22659 5.29333 8.44659 5.32667 8.64659 5.39334" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3.98632 3.36665C6.89965 0.626646 12.5463 1.56665 13.5863 6.17331C14.353 9.55998 12.2463 12.4266 10.3997 14.2C9.05965 15.4933 6.93965 15.4933 5.59298 14.2C3.75298 12.42 1.63965 9.55331 2.41298 6.16665" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    timer: `<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5.83331V9.16665" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6 1.83331H10" stroke="#292D32" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3.33366 5.83333C2.60033 6.80667 2.16699 8.02 2.16699 9.33333C2.16699 12.5533 4.78033 15.1667 8.00033 15.1667C11.2203 15.1667 13.8337 12.5533 13.8337 9.33333C13.8337 6.11333 11.2203 3.5 8.00033 3.5C7.16033 3.5 6.36699 3.67333 5.64699 3.99333" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `,
  };
  const templates = {
    0: (eventData) => {
      const startDate = new Date(eventData.startDate);
      return `<div class="card embed-card" role="button">${
        eventData.eventType === 0 ? '<div class="tag">Free</div>' : ''
      }<div class="card-img-top"> <img src="${
        eventData.media
      }" alt="Event poster"/> </div> <div class="card-body"> <h1 class="content-title">${
        eventData.title
      }</h1> <p class="content-subtitle two-line-overflow-ellipsis"> ${
        eventData.description
      } </p> <div class="content"> <div class="content-details"> <div class="content-label"> ${
        icons.location
      } <small> ${
        eventData.location
      } </small> </div> <div class="content-label"> ${
        icons.timer
      } <small> ${formatTime(eventData.startDate)}&nbsp;(${extractTimezone(
        eventData.timeZone
      )}) </small> </div> </div> <div class="content-date"> <p> ${
        months[startDate.getMonth()]
      } </p> <p>${padZero(
        startDate.getDate()
      )}</p></div></div></div><div class="cta-embed-pane"> <a href="${BASE_URL}/auth/events/${
        eventData.eventId
      }" target="_blank" class="embed-cta-btn"><span>Register Now</span></a></div></div>`;
    },
    1: (eventData) => {
      const startDate = new Date(eventData.startDate);
      return `<div class="card embed-card" role="button"> <div class="card-body">${
        eventData.eventType === 0 ? '<div class="tag">Free</div>' : ''
      }<h1 class="content-title text-truncate">${
        eventData.title
      }</h1> <p class="content-subtitle two-line-overflow-ellipsis"> ${
        eventData.description
      } </p> <div class="content"> <div class="content-details"> <div class="content-label"> ${
        icons.location
      } <small> ${
        eventData.location
      } </small> </div> <div class="content-label"> ${
        icons.timer
      } <small>${formatTime(eventData.startDate)}&nbsp;(${extractTimezone(
        eventData.timeZone
      )})</small> </div> </div> <div class="content-date"> <p> ${
        months[startDate.getMonth()]
      }</p><p>${padZero(
        startDate.getDate()
      )}</p></div> </div> <div class="cta-embed-pane"> <a href="${BASE_URL}/auth/events/${
        eventData.eventId
      }" target="_blank" class="embed-cta-btn"> <span>Register Now</span> </a> </div> </div> <div class="card-img-bottom"> <img src="${
        eventData.media
      }" alt="Event poster" /></div></div>`;
    },
    2: (eventData) => {
      const startDate = new Date(eventData.startDate);
      return `<div class="card embed-card" role="button">${
        eventData.eventType === 0 ? '<div class="tag">Free</div>' : ''
      }<div class="card-title"> <h1 class="content-title">${
        eventData.title
      }</h1> <p class="content-subtitle two-line-overflow-ellipsis">${
        eventData.description
      }</p></div><div class="card-img"> <img src="${
        eventData.media
      }" alt="Event poster" /> </div> <div class="card-body"> <div class="content"> <div class="content-details"> <div class="content-label"> ${
        icons.location
      }<small>${eventData.location}</small> </div> <div class="content-label">${
        icons.timer
      }<small>${formatTime(eventData.startDate)}&nbsp;(${extractTimezone(
        eventData.timeZone
      )})</small></div></div><div class="content-date"> <p>${
        months[startDate.getMonth()]
      }</p><p>${padZero(
        startDate.getDate()
      )}</p></div></div></div><div class="cta-embed-pane"> <a href="${BASE_URL}/auth/events/${
        eventData.eventId
      }" target="_blank" class="embed-cta-btn"> <span>Register Now</span></a></div></div>`;
    },
    3: (eventData) => {
      const startDate = new Date(eventData.startDate);
      return `<div class="card embed-card" role="button">${
        eventData.eventType === 0 ? '<div class="tag">Free</div>' : ''
      }<h1 class="content-title">${
        eventData.title
      }</h1> <div class="card-img"> <img src="${
        eventData.media
      }" alt="Event poster" /> </div> <div class="card-body"> <p class="content-subtitle two-line-overflow-ellipsis"> ${
        eventData.description
      } </p> <div class="content"> <div class="content-details"> <div class="content-label"> ${
        icons.location
      } <small> ${
        eventData.location
      } </small> </div> <div class="content-label">  ${
        icons.timer
      } <small>${formatTime(eventData.startDate)}&nbsp;(${extractTimezone(
        eventData.timeZone
      )})</small></div></div><div class="content-date"><p>${
        months[startDate.getMonth()]
      }</p> <p>${padZero(
        startDate.getDate()
      )}</p></div></div></div> <div class="cta-embed-pane"> <a href="${BASE_URL}/auth/events/${
        eventData.eventId
      }" target="_blank" class="embed-cta-btn"> <span>Register Now</span> </a> </div> </div>`;
    },
  };
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  /**
   * Get an event using the Id
   * @param {string} eventId
   */
  async function getAllEventsByPublisherId(publisherId) {
    const response = await fetch(
      `${API_URL}/GetAllEventByUserId?userId=${publisherId}&page=${pager.page}&pagesize=${pager.pageSize}`,
      {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      }
    );

    return response.json();
  }

  function injectStyle() {
    const id = 'eventglo-template-style';
    if (document.querySelector(`#${id}`)) {
      return;
    }
    const style = document.createElement('style');
    style.innerText = styles;
    style.id = id;
    document.head.append(style);
  }

  /**
   * pad zero
   * @param {number} value
   * @returns {string}
   */
  function padZero(value) {
    return value >= 10 ? `${value}` : `0${value}`;
  }

  /**
   * format time using 12 hours format
   * @param {string} date
   * @returns {string}
   */
  function formatTime(date) {
    const d = new Date(date);
    const hours24 = d.getHours();
    const hours = hours24 > 12 ? hours24 - 12 : hours24;
    const minutes = d.getMinutes();
    const median = hours24 >= 12 ? 'PM' : 'AM';
    return `${padZero(hours)}:${padZero(minutes)} ${median}`;
  }

  /**
   * Get timezone offset
   * `(GMT-10:00) Hawaii` returns `GMT-10`
   * @param {string} timezone
   * @returns {string}
   */
  function extractTimezone(timezone) {
    const result = timezone.match(/(GMT|UTC)(\+|\-)\d+/);
    return result ? result[0] : 'GMT+01';
  }

  /**
   * Renders a template to the UI
   * @param {Element} target
   * @param {string} template
   * @param {Object} event
   */
  function renderTemplate(target, template, classList) {
    const element = document.createElement('div');
    element.classList = classList || [];
    element.innerHTML = template;
    target.appendChild(element);
  }

  function clearLoaderState() {
    if (loaderState) {
      clearInterval(loaderState);
      loaderState = null;
    }
  }

  function loading(show = true) {
    const id = 'eventglo-loader';
    let loader = parentElement.querySelector(`#${id}`);
    if (!loader) {
      loader = document.createElement('div');
      loader.id = id;
      parentElement.appendChild(loader);
    }
    clearLoaderState();
    if (show) {
      loader.classList.add('show');
      let tick = 0;
      loaderState = setInterval(() => {
        const dot = '.'.repeat(tick++);
        loader.innerHTML = `<span>Please wait${dot}</span>`;
        tick = tick > 3 ? 0 : tick;
      }, 500);
    } else {
      loader.classList.remove('show');
    }
  }

  async function loadEvents() {
    pager.page += 1;
    loading();
    const response = await getAllEventsByPublisherId(publisherId);
    loading(false);
    if (response.data) {
      pager.page = response.data.page;
      pager.pageSize = response.data.pageSize;
      pager.totalSize = response.data.totalSize;
      pager.items.push(...response.data.items);
      response.data.items.forEach((eventData) => {
        renderTemplate(parentElement, templates[template](eventData), ['']);
      });
    }
  }

  /**
   * initialize embed module
   */
  async function init() {
    parentElement = document.querySelector('.eventglo-embed');
    if (parentElement) {
      const brandColor = parentElement.dataset.brandColor || '#000000';
      publisherId = parentElement.dataset.publisherId;
      template = parseInt(parentElement.dataset.template) || 0;

      parentElement.setAttribute('style', `--brand-color: ${brandColor}`);
      injectStyle();
      loadEvents();
    }
  }

  return { init, version: '1.0.0' };
})();

EventGloEmbed.init();
