// const eventsUrl = 'https://api.eventglo.io/api/Event/GetAllEvents';
// let events = [];
// let ticketDetails;
// let mapTickets = [];
// let totalPrice = 0;
// let ticketPrice = 0;
// let ticketType = '';
// let quantity = 0;
// let ticketQuantity = 0;
// let imagePath = '../';

// const formatDateString = (dateString, options={month: 'long'}) => {
//     const date = new Date(dateString);
//     // const options = { month: 'long' };
//     return date.toLocaleString('en-US', options);
// }

// let publishedEvents = [
//     {
//         title: 'test Event 1',
//         eventType: 0,
//         capacity: 100,
//         category: 'Virtual',
//         description: 'description',
//         tags: 'Technical',
//         country: 'Nigeria',
//         timezone: 'UTC+1 Lagos',
//         isPrivate: true,
//         startDate: new Date()
//     },
//     {
//         title: 'test Event 2',
//         eventType: 1,
//         capacity: 100,
//         category: 'Virtual',
//         description: 'description',
//         tags: 'Technical',
//         country: 'Nigeria',
//         timezone: 'UTC+1 Lagos',
//         isPrivate: true,
//         startDate: new Date()
//     },
//     {
//         title: 'test Event 3',
//         eventType: 0,
//         capacity: 100,
//         category: 'Virtual',
//         description: 'description',
//         tags: 'Technical',
//         country: 'Nigeria',
//         timezone: 'UTC+1 Lagos',
//         isPrivate: true,
//         startDate: new Date()
//     }
// ];

// let formData = {
//     name: '',
//     email: '',
//     gender: '',
//     media: '',
//     country: '',
//     phoneNum: '',
//     heardAboutUs: '',
//     ticketType: '',
//     ticketQuantity: 0,
//     ticketPrice: 0,
// }
// let submitting = false;
// let eventData = null;

// const eventWrapper = document.querySelector('#eventglo_wrapper');
// const userId = eventWrapper.getAttribute('data-clientId');
// const modalSection = document.createElement('div');

// const closeModal = () => {
//     modalSection.style.display = 'none';
//     const modal = document.querySelector('#myModal');
//     modal.setAttribute('style', "display: none");
// }

// const handleChange = (field) => {
//     const inputValue = document.getElementById(field).value;
//     formData[field] = inputValue;
// }

// const createFormModal = (eventData) => {
//     if(eventData.eventType == 1){
//         getEventTickets(eventData.eventId);
//     }

//     const modal = `
//     <div id="myModal" class="eventglo__modal">
//       <!-- Modal content -->
//       <div class="eventglo__modal-content">
//         <span class="eventglo__close" onClick="closeModal()">&times;</span>
//         <div id="">
//             <form>
//                 <div class="zt-mt-1">
//                     <div class="label">Full Name</div>
//                     <div>
//                         <input type="text" id="name" class="eventglo__input" oninput="handleChange('name')" name="name" placeholder="name" />
//                     </div>
//                 </div>

//                 <div class="zt-mt-1">
//                     <div class="label">Your Gender</div>
//                     <div>
//                         <select name="gender" id="gender" class="eventglo__input" onchange="handleChange('gender')">
//                             <option value="">Select Gender</option>
//                             <option value="Male">Male</option>
//                             <option value="Female">Female</option>
//                             <option value="Other">Prefer Not say</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div class="zt-mt-1">
//                     <div class="label">Email</div>
//                     <div>
//                         <input type="email" id="email" name="email" placeholder="your email" class="eventglo__input" oninput="handleChange('email')" />
//                     </div>
//                 </div>

//                 <div class="zt-mt-1">
//                     <label class="label">Phone Number</lable>
//                     <div>
//                         <input type="text" id="phoneNum" name="phoneNum" placeholder="phoneNum" class="eventglo__input" oninput="handleChange('phoneNum')" />
//                     </div>
//                 </div>

//                 <div>
//                     <div class="label">Country</div>
//                     <select name="country" id="country" class="eventglo__input" onchange="handleChange('country')">
//                         <option value="USA">USA</option>
//                         <option value="Canada">Canada</option>
//                         <option value="England">England</option>
//                         <option value="FinLand">FinLand</option>
//                         <option value="Ghana">Ghana</option>
//                         <option value="Netherlands">Netherlands</option>
//                         <option value="Nigeria">Nigeria</option>
//                         <option value="SouthAfrica">SouthAfrica</option>
//                         <option value="United Kingdom">United Kingdom</option>
//                         <option value="Eygpt">SouthAfrica</option>
//                     </select>
//                 </div>

//                 <!-- *ngIf="regForm.value['heardAboutUs'] !== 'Other' " -->
//                 <div class="zt-mt-1">
//                     <div class="label">How did you hear about us</div>
//                     <div>
//                         <select name="heardAboutUs" id="heardAboutUs" class="eventglo__input" onchange="handleChange('heardAboutUs')">
//                             <option value="">How did you hear about us?</option>
//                             <option value="Online search">Online search</option>
//                             <option value="Social media (Facebook, Twitter, Instagram, etc.)">Social media (Facebook, Twitter, Instagram, etc.)</option>
//                             <option value="Word of mouth">Word of mouth</option>
//                             <option value="Print media (newspaper, magazine)">Print media (newspaper, magazine)</option>
//                             <option value="Referral from a friend">Referral from a friend</option>
//                             <option value="Television advertisement">Television advertisement</option>
//                             <option value="Direct mail or flyer">Direct mail or flyer</option>
//                             <option value="Other">Other</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div>
//                     <div style="display: flex; justify-content: space-between;">
//                         <h1 id="ticketType"></h1>
//                         <h1 id="ticketPrice"></h1>
//                     </div>
//                     <div id="ticketSection"></div>
//                 </div>

//                 <div class="btn-wrapper" style="display: flex; justify-content: center; margin: 20px auto;">
//                     <button id="e__submit-btn" class="eventglo__submit-btn" type="button" onclick="registerEvent()">
//                         <span>
//                             ${ submitting ? 'Loading' : 'Register for Event' }
//                         </span>
//                     </button>
//                 </div>
//             </form>
//         </div>
//       </div>
//     </div>
//     `
//     modalSection.style.display = 'block';
//     modalSection.innerHTML = modal;
//     eventWrapper.appendChild(modalSection);
// }

// const populateTemplate = (eventData, template) => {
//     let htmlTemplate = `
//         <div id="card-${eventData.eventId}" class="card s-card" style="position: relative;">
//             <div class="tag" style="display: ${eventData.eventType === 0 ? 'block' : 'none' }">
//                 Free
//             </div>
//             <div class=" mt-3 d-flex">
//                 <div>
//                     <img class="mt-2 zt-w-46" src="${eventData.media || imagePath + 'e-image3.png'}" width="80px" height="80px" alt="" style="margin-top: 2px; object-fit: contain; margin-right: 10px;">
//                 </div>
//                 <div>
//                     <h5 class="mt-1 s-cardtitle">${eventData.title || '--'}</h5>
//                     <!-- <h5 class="card-title">Simple event to test for embedding of event to client's website</h5> -->
//                 </div>
//             </div>
//             <div class="card-body" style="margin-top: -10px;">
//                 <h5 class="card-text-title">${eventData.title || '--'}</h5>
//                 <img class="mr-1" width="15" src="${imagePath}timer.png" alt="" style="margin-bottom: 5px;">
//                 <!-- <small class="text-muted s-date">{{ eventRecord?.startDate | date }}</small> -->
//                 <small class="text-muted s-date">${formatDateString(eventData.startDate)}</small>
//                 <img class="ml-2 mr-1" width="12" src="${imagePath}avatar-icon.png" alt=""
//                 style="margin-bottom: 5px;">
//                 f<small class="text-muted s-date">1/${eventData.capacity}</small>
//                 <p class="mt-2 card-text s-cardtext">${eventData.description || '--'}</p>
//             </div>
//             <div style="display: flex; justify-content: center;">
//                 <button class="s-btn submit-btn" style="width: max-content; text-align: center; border: none" type="button" onClick="openRegistrationModal('${eventData.eventId}')">
//                     Register for Event
//                     <!-- <img class="zt-w-10" style="margin-left: 5px; padding-bottom: 1px;" src="${imagePath}iconBaseUarrow-right-blue.png' " alt=""> -->
//                 </button>
//             </div>
//         </div>
//     `;
//     if(template.template == 2){
//         htmlTemplate = `
//             <div class="s-card" onClick="openRegistrationModal('${eventData.eventId}')">
//                 <img src="${eventData.media || imagePath + 'e-image3.png'}" width="100%" height="312px" style="object-fit: contain;" class="imgs" alt="Photo of sunset">
//                 <div style="display: flex; justify-content: left;">
//                 <div>
//                     <p class="card-titley mb-2" style="margin-top: 20px; font-weight: 500; margin-right: 17px; margin-left: 15px;">${ formatDateString(eventData.startDate) }</p>
//                     <p class="card-titley" style="color: black; font-size: 35px; font-weight: 700; margin-right: 15px; margin-left: 10px;">${ formatDateString(eventData.startDate, { day: 'numeric' }) }</p>
//                 </div>
//                 <!-- <div>
//                 </div> -->
//                 <div>
//                     <h5 class="card-texty mt-3 mb-2">${ eventData.title }</h5>
//                     <p class="card-texty" style="font-family: Arial, Helvetica, sans-serif; font-weight: 400; font-size: 15px; color: #6A6A6A;">
//                         ${ eventData.description }
//                     </p>
//                 </div>
//                 </div>
//             </div>
//         `
//     }
//     if(template.template == 3){
//         htmlTemplate = `
//             <div class="card item-card card-block">
//                 <div style="width: 100%; height: 150px;">
//                     <img src="${eventData.media || imagePath + 'e-image3.png'}"
//                         style="object-fit: cover; width: 300px; height: 150px; border-top-right-radius: 19px; border-top-left-radius: 19px""
//                         alt="Photo of sunset"
//                     />
//                 </div>

//                 <div style="display: flex; justify-content: space-between; padding: 0 10px; margin-top: 20px;">
//                     <div>
//                         <h3 class="zt-ml-1">${ eventData.title }</h3>
//                         <div style="display: flex; justify-content: start; margin: 10px 0;">
//                             <div class="go-back zt-w-44 zt-d-flex justify-content-center align-items-center" style="margin-right: 10px;">
//                                 <img class="zt-w-24 zt-my-auto" width="20px" height="20px" src="${imagePath}location-black.png" alt="">
//                             </div>
//                             <div class="zt-fs-14 zt-my-auto">${ eventData.location }</div>
//                         </div>
//                         <div style="display: flex; justify-content: start; margin: 10px 0;">
//                             <div class="go-back zt-w-44 zt-d-flex justify-content-center align-items-center" style="margin-right: 10px;">
//                                 <img class="zt-w-24 zt-my-auto" width="20px" height="20px" src="${imagePath}timer.png" alt="">
//                             </div>
//                             <div class="zt-fs-14 zt-my-auto">${ formatDateString(eventData.startTime, { day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true,}) }</div>
//                         </div>
//                     </div>

//                     <div class="zt-my-auto">
//                         <p class="card-titley mb-2" style="font-size: 35px; font-weight: 400;">${ formatDateString(eventData.startDate) }</p>
//                         <p class="card-titley" style="color: black; font-size: 35px; font-weight: 700">${ formatDateString(eventData.startDate, { day: 'numeric' }) }</p>
//                     </div>
//                 </div>

//                 <div style="display: flex: justify-content: center; margin: 10px auto;">
//                     <button
//                         style="border: 1px solid black; border-radius: 10px; padding: 10px 35px; border: 1px solid #2907B0; background: #2907B0; color: white"
//                         onClick="openRegistrationModal('${eventData.eventId}')"
//                     >
//                         Register Now
//                     </button>
//                 </div>
//             </div>
//         `
//     }

//     return htmlTemplate;
// }

// let incrementBtns;
// let decrementBtns;

// const decrementTicketQuantity = (e, ticket) => {
//     e.preventDefault();
//     ticketPrice = ticket.price || 0;
//     ticketQuantity = ticket.quantity || 0;
//     ticketType = ticket.ticketType || '';
//     if (quantity < 1) {
//     //   this.toastr.info('Ticket quantity cannot be less than 1');
//         return;
//     } else {
//         quantity --;
//         totalPrice = ticketPrice * quantity;
//         const input = document.querySelector('#quantityInput');
//         const ticketTypeEle = document.querySelector('#ticketType');
//         const ticketPriceEle = document.querySelector('#ticketPrice');
//         input.value = quantity;

//         ticketTypeEle.textContent = ticketType;
//         ticketPriceEle.textContent = totalPrice;
//     }
// }

// const incrementTicketQuantity = (e, ticket) => {
//     e.preventDefault();
//     ticketPrice = ticket.price || 0;
//     ticketQuantity = ticket.quantity || 0;
//     ticketType = ticket.ticketType || '';
//     if(quantity < ticketQuantity){
//         quantity ++;
//         totalPrice = ticketPrice * quantity;
//         const input = document.querySelector('#quantityInput');
//         const ticketTypeEle = document.querySelector('#ticketType');
//         const ticketPriceEle = document.querySelector('#ticketPrice');
//         input.value = quantity;

//         ticketTypeEle.textContent = ticketType;
//         ticketPriceEle.textContent = totalPrice;
//     }else{
//     //   this.toastr.info('You have reached maximum ticket available');
//         return;
//     }
// }

// const populateTicketCard = (ticket) => {

//     const template = `
//         <div  class="card mb-3" style="width: 394px; border-radius: 8px; border-left: 5px solid #F79521; box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.14);">
//             <div class="card-body">
//                 <div>

//                     <div style="display: flex; justify-content: space-between">
//                         <div>
//                             <p>${ ticket.ticketType }</p>
//                         </div>
//                         <div>
//                             <p>${ ticket.price }</p>
//                         </div>
//                     </div>

//                     <form class="" >
//                         <div style="display: flex; justify-content: space-between;">
//                             <div class="form-group1">
//                                 <button
//                                     class="outline-button-black decrementBtn" style="border-radius: 4px;"
//                                     onclick="decrementTicketQuantity(e)"
//                                 >
//                                     -
//                                 </button>
//                             </div>
//                             <div style="padding: 10px 0 10px 0">
//                                 <input id="quantityInput" disabled="true" value="${quantity}" placeholder="${quantity}" style="width: 100%: border-radius: 4px;" />
//                             </div>

//                             <div class="form-group1">
//                                 <button
//                                     class="outline-button-black incrementBtn" style="border-radius: 4px;"
//                                     onclick="incrementTicketQuantity(e)"
//                                 >
//                                     +
//                                 </button>
//                             </div>
//                         </div>

//                     </form>
//                 </div>

//             </div>
//         </div>
//     `;

//     return template;
// }

// const openRegistrationModal = (eventId) => {
//     if(eventId !== undefined || null){
//         eventData = publishedEvents.find(item => item.eventId === eventId);
//         createFormModal(eventData);
//     }
//     return;
// }

// // const setHeader = () => {
// //     const app = document.querySelector('#appHeader');
// //     const header = app.firstElementChild;
// //     const link1 = document.createElement('link');
// //     link1.setAttribute('href', "https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;1,100;1,200;1,300;1,400;1,500;1,600&display=swap");
// //     link1.setAttribute('rel', "stylesheet");
// //     const link2 = document.createElement('link');
// //     link2.setAttribute('href', "https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;1,300&display=swap");
// //     link2.setAttribute('rel', "stylesheet");
// //     const link3 = document.createElement('link');
// //     link3.setAttribute('href', "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&display=swap");
// //     link3.setAttribute('rel', "stylesheet");
// //     const link4 = document.createElement('link');
// //     link4.setAttribute('href', "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css");
// //     link4.setAttribute('rel', "stylesheet");
// //     const link5 = document.createElement('link');
// //     link5.setAttribute('href', "https://getbootstrap.com/docs/5.2/assets/css/docs.css");
// //     link5.setAttribute('rel', "stylesheet");

// //     header.appendChild(link1)
// //     header.appendChild(link2)
// //     header.appendChild(link3)
// //     header.appendChild(link4)
// //     header.appendChild(link5)
// // }

// const getAllEvents = async (template) => {
//     fetch(eventsUrl)
//     .then(res => res.json())
//     .then(res => {
//         events = res.data;
//         publishedEvents = events.filter((item) => (item.isPublish === true && item.userId === userId))
//         if(publishedEvents.length > 0){
//             const header = document.createElement('h2');
//             header.textContent = 'Upcoming Events';
//             header.style.margin = '10px 0 20px 0';
//             eventWrapper.appendChild(header);
//             const eventsWrapper = document.createElement('div');
//             eventsWrapper.setAttribute('class', 'events_wrapper')
//             publishedEvents.forEach(item => {
//                 const div = document.createElement('div');
//                 div.innerHTML = populateTemplate(item, template)
//                 eventsWrapper.appendChild(div);
//                 if(template.template == 1){
//                     const submitBtns = document.querySelectorAll('.submit-btn');
//                     submitBtns.forEach(btn => {
//                         btn.addEventListener('click', () => openRegistrationModal())
//                     })
//                 }
//             });
//             eventWrapper.appendChild(eventsWrapper);
//         }
//     })
//     .catch(err => {
//         console.log(err);
//     });
// }

// const getEventTemplate = async (userId) => {
//     const url = `https://api.eventglo.io/api/Template/GetTemplateSelectionsByUserId/?userId=${userId}`
//     fetch(url)
//     .then(res => res.json())
//     .then(res => {
//         const template = res;
//         getAllEvents(template);
//     })
//     .catch(err => {
//         console.log(err);
//     });
// }
// const getEventTickets = async (id) => {
//     const url = `https://api.eventglo.io/api/Event/GetTicketsByEventId/${id}`
//     fetch(url)
//     .then(res => res.json())
//     .then(res => {
//         ticketDetails = res.data;
//         const ticketSection = document.getElementById('ticketSection');
//         mapTickets = ticketDetails.tickets.map(item => {
//             ticketSection.innerHTML = populateTicketCard(item);
//             incrementBtns = document.querySelectorAll('.incrementBtn');
//             decrementBtns = document.querySelectorAll('.decrementBtn');
//             incrementBtns.forEach(btn => btn.addEventListener('click', (e) => incrementTicketQuantity(e, item)))
//             decrementBtns.forEach(btn => btn.addEventListener('click', (e) => decrementTicketQuantity(e, item)));
//         });
//     })
//     .catch(err => {

//         console.log(err);

//     });
// }

// const registerEvent = async () => {
//     submitting = true;
//     openRegistrationModal();
//     const data = formData;
//     if(eventData.eventType == 1){
//         data.ticketPrice = ticketPrice;
//         data.ticketQuantity = quantity;
//         data.ticketType = ticketType;
//     }
//     data.eventUrl = `/events/live/join/${eventData.eventId}`
//     data.eventName = eventData.title,
//     data.eventId = eventData.eventId

//     const url = 'https://api.eventglo.io/api/Event/RegisterForEvent'
//     fetch(url, {
//         method: "POST", // *GET, POST, PUT, DELETE, etc.
//         mode: "cors", // no-cors, *cors, same-origin
//         cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: "same-origin", // include, *same-origin, omit
//         headers: {
//           "Content-Type": "application/json",
//         },
//         redirect: "follow", // manual, *follow, error
//         referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//         body: JSON.stringify(data), // body data type must match "Content-Type" header
//       })
//       .then(res => res.json())
//       .then(res => {
//         submitting = false;
//         formData = {
//             name: '',
//             email: '',
//             gender: '',
//             media: '',
//             country: '',
//             phoneNum: '',
//             heardAboutUs: '',
//             ticketType: '',
//             ticketPrice: 0,
//             ticketQuantity: 0,
//         }
//         if(res.message == 'Event totally booked ask to join waitList if available'){
//             // openWaitListModal(payload);
//             // create Join wishlist modal and display to user
//         }else{

//             let checkoutUrl = '';
//             let ticketCode = '';
//             if(eventData.eventType == 0){
//                 checkoutUrl = res.item2.ticketUrl;
//                 ticketCode = res.item2.ticketCode
//                 alert('Event registered successfully, Check your mail for event link');
//             }else {
//                 checkoutUrl = res.item2._links.checkout.href;
//                 const anchor = document.createElement('a');
//                 anchor.setAttribute('href', checkoutUrl);
//                 anchor.setAttribute('target', '_blank');
//                 anchor.click();
//                 closeModal();
//             }
//             // const resData = res.item1.data;
//             // if(eventData.eventType == 0){
//             // }else {
//             // }
//         }
//       })
//       .catch(err => {
//         submitting = false;
//         console.log('error occurred');
//       })
// }

// // setHeader();
// // getAllEvents();
// getEventTemplate(userId)

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
  const BASE_URL = 'https://dev.eventglo.io';
  const API_URL = 'https://api.eventglo.io/api/Event';
  const styles =
    '.eventglo-embed-container{width: 100%; max-width: 1200px;margin: 0px auto; position: relative;}.eventglo-embed {line-height:20px;font-weight:400;font-size:15px;display: flex;flex-wrap: wrap; width: 100%; min-height:24em;}.eventglo-embed *{box-sizing: border-box;}.eventglo-embed > *{max-width: 100%;padding: 0 0.75rem;flex: 0 0 auto;width: 100%;margin-bottom: 1rem} @media screen and (min-width: 576px){.eventglo-embed > * {flex: 0 0 auto;width: 50%}} @media screen and (min-width: 768px) {.eventglo-embed > * {flex: 0 0 auto; width: 33.3333%}} @media screen and (min-width: 1200px){.eventglo-embed > * {flex: 0 0 auto; width: 25%}} .eventglo-embed .embed-card {display:flex;flex-direction:column;background-clip:border-box;word-wrap:break-ord;font-family:Roboto, Verdana, sans-serif;border:0;border-radius:0;box-shadow:0px 2px 10px 0px #008cfe1a;min-height:24em;position:relative;width:100%;}.eventglo-embed .embed-card * {margin:0;padding:0;box-sizing:border-box;}.eventglo-embed .embed-card .card-body {flex:1 1 auto;padding:1rem;}.eventglo-embed .embed-card img {max-width:100%;}.eventglo-embed .embed-card .card-img-top,.eventglo-embed .embed-card .card-img-bottom,.eventglo-embed .embed-card .card-img {border-radius:0;} .eventglo-embed .embed-card .content-details{max-width: 85%} .eventglo-embed .embed-card > .card-title {padding:1rem;}.eventglo-embed .embed-card > .card-title,.eventglo-embed .embed-card > .card-title h1,.eventglo-embed .embed-card > .card-title p {margin-bottom:0;}.eventglo-embed .embed-card .content {width:100%;display:flex;justify-content:space-between;}.eventglo-embed .embed-card .content + .cta-embed-pane {padding-top:0.75rem;}.eventglo-embed .embed-card .content-title {font-size:1rem;font-weight:700;margin-bottom:0.5rem;text-transform:capitalize;}.eventglo-embed .embed-card .content-title, .eventglo-embed .content small {overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%;} .eventglo-embed .embed-card > .content-title {padding:1rem 1rem 0 1rem;}.eventglo-embed .embed-card .content-subtitle {font-size:0.8rem;font-weight:400;margin-bottom:1rem;}.eventglo-embed .embed-card .content-details .content-label {display:flex;align-items:center; max-width: 100%; overflow: hidden;}.eventglo-embed .embed-card .content-details .content-label:not(:last-child) {margin-bottom:0.75rem;}.eventglo-embed .embed-card .content-details .content-label svg,.eventglo-embed .embed-card .content-details .content-label img {width:12px;margin-right:0.5rem;}.eventglo-embed .embed-card .content-details .content-label small {font-size:0.75rem;}.eventglo-embed .embed-card .content-date {font-size:1.5rem;font-weight:700;align-self:center;}.eventglo-embed .embed-card .content-date p:first-child {font-size:1.25rem;font-weight:400;}.eventglo-embed .embed-card .content-date * {margin-top:0;margin-bottom:10px;}.eventglo-embed .embed-card .cta-embed-pane {text-align:center;}.eventglo-embed .embed-card .cta-embed-pane .embed-cta-btn {display:inline-block;width:100%;max-width:80%;border:1px solid var(--brand-color);border-radius:8px;color:var(--brand-color);background-color:#fff;cursor:pointer;padding:0.35rem 0.75rem;text-decoration:none;font-size:1rem;transition:transform 0.3s ease-in-out;}.eventglo-embed .embed-card .cta-embed-pane .embed-cta-btn:hover {transform:translateY(-1px);}.eventglo-embed .embed-card .cta-embed-pane .embed-cta-btn span {font-weight:500;}.eventglo-embed .embed-card .content-image {width:8em;max-width:8em;height:10em;margin-right:0.5rem;border-radius:8px;overflow:hidden;}.eventglo-embed .embed-card .content-image img {width:100%;height:100%;border-radius:8px;object-fit:cover;}.eventglo-embed .embed-card .two-line-overflow-ellipsis {overflow:hidden;text-overflow:ellipsis;display:-webkit-box;line-clamp:2;-webkit-line-clamp:2;-webkit-box-orient:vertical; min-height: calc(2rem + 5px);}.eventglo-embed .embed-card .card-body > .content-subtitle {margin-bottom:0.5rem;}.eventglo-embed .embed-card > .cta-embed-pane {align-self:flex-end;width:100%;padding:0 1rem 1rem 1rem;}.eventglo-embed .embed-card .card-img-top,.eventglo-embed .embed-card .card-img-bottom,.eventglo-embed .embed-card .card-img {border-radius:0px !important;height:10em;overflow:hidden;max-width: 100%}.eventglo-embed .embed-card .card-img-top img,.eventglo-embed .embed-card .card-img-bottom img,.eventglo-embed .embed-card .card-img img {width:100%;height:100%;object-fit:cover;object-position:center;} .eventglo-embed-container #eventglo-loader {position: absolute; left: 0; right: 0; top: 0; bottom: 0; background-color: rgba(255, 255, 255, 0.8); justify-content: center; align-items: center; width: 100%; z-index: 600; display: none} .eventglo-embed-container #eventglo-loader.show {display: flex} .eventglo-embed-container #eventglo-loader span {display: inline-block; font-family: Roboto, Verdana, san-serif; font-weight: 700; font-size: 1rem; color: #303030;}}';
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
      return `<div class="card embed-card" role="button"> <div class="card-img-top"> <img src="${
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
      return `<div class="card embed-card" role="button"> <div class="card-body"> <h1 class="content-title text-truncate">${
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
      return `<div class="card embed-card" role="button"> <div class="card-title"> <h1 class="content-title">${
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
      return `<div class="card embed-card" role="button"><h1 class="content-title">${
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
  async function getEventById(eventId) {
    const response = await fetch(`${API_URL}/GetEventByEventId/${eventId}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });

    return response.json();
  }

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
