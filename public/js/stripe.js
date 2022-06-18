/* eslint-disable */
const btnBook=document.getElementById('bookTour')

// import axios from 'axios'; pk_live_51KSg7ESGqYHLZ5r2Dp7c0NTsYfAdGWZdxRboHpZyohVy1hEpiU1HGVbpaFKMUo5cgmtQvCC7UCpw6fq5wBrh8qrb00qWh4fL2M
const stripe = Stripe('pk_test_51KSg7ESGqYHLZ5r2peUXnzGapYHhpAvep5nBPzYHtdx3wfxjy1GaRw1gFEfoYZ6OrYvR1sx8tlmfaPvkq67JxcEL00LvmdUPbe');
const bookTour = async tourId => {
      // 1) Get checkout session from API
      const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
       console.log(session);
  
      // 2) Create checkout form + chanre credit card
      await stripe.redirectToCheckout({
        sessionId: session.data.session.id
      })
    }

    
    if (btnBook)
  // document.addEventListener('submit', e => {
    btnBook.addEventListener('click', e => {
    e.preventDefault();
    e.target.textContent='Processing'
    const tourID= e.target.dataset.tourId;
    console.log(tourID)
     bookTour(tourID)
  });