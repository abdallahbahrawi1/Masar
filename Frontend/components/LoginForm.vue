<template>
    <div class="container-fluid">
      <form class="login-form mx-auto ">
        <h4 class="text-center">Login</h4>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1">
          <div id="emailHelp" class="form-text mt-3">Forget password?</div>
  
        </div>
  
        <button type="submit" class="btn btn-primary mt-4">Login</button>
      </form> 
    </div>
</template>
    
<style>


form{
width: 40%;
background-color: white ;
padding: 50px;
border-radius: 20px;
margin-top:15px;
}

.btn-primary{
width: 100%;
border: none;
border-radius: 50px;
background: linear-gradient(98deg, rgba(2, 0, 36, 1) 0%, rgba(75, 14, 154, 1)  35%, rgba(0, 212, 255, 1) 100%);
}

.form-control{
color: rgba(0, 0, 0, 0.42);
border-bottom-color: rgba(0, 0, 0, 0.42);
box-shadow: none !important;
border: none;
border-bottom: 1px solid;
border-radius: 4px 4px 0 0;
}

.login-form h4 {
font-size: 2rem !important;
font-weight: 700;
}
.form-label {
font-family: 800 !important;
}

@media only screen and (max-width: 900px){
form {
    width: 60%;
}
}
</style>