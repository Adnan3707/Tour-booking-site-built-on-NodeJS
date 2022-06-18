const loginForm = document.querySelector('.form--login');
const btnclick=document.getElementById('btn')
{
  /*
 console.log(loginForm);
 console.log(btnclick)
*/
}
 const login= async (email,password) =>{
    // alert(email,password)
    console.log(email);
    console.log(password)

       const res =  await axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/api/v1/tours/user/signup/login',
        data: {
          email,
          password
         }
         })
     console.log(res)
      try{
         console.log(res.data.status);
       if(res.data.status === 'Success') {
        //showAlert
        alert('success , Logged in successfully!');
        window.setTimeout(() => {
          location.assign('/');
        }, 1500);
      } 
        }catch (err) {
     // showAlert
      alert('error', err.response.data.message);
    }
  }
if (loginForm)
  // document.addEventListener('submit', e => {
    btnclick.addEventListener('click', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password)
  });
  
{ 
  /*
const loginForm1 = document.querySelector('.form--login1');
const fileSelector = document.getElementById('myImage')
const login1=async (file,email)=>{
    const res =  await axios({
      method: 'PATCH',
      url: '127.0.0.1:3000/api/v1/tours/5c88fa8cf4afda39709c296c',
      data: {
        file,
        email
       }
       })       
 console.log(res)
  }
  */

/* 
document.addEventListener('btn1', e => {
  e.preventDefault();
  login1()

  // const email = document.getElementById('email').value;
  // const password = document.getElementById('password').value;
  // login(email, password)
});
*/
/*
fileSelector.addEventListener('change', e => {
  const email = document.getElementById('email').value;
  console.log(e);
  console.log(fileSelector.files[0])
  login1(fileSelector.files[0],email)
});
*/
}