import React from "react";
import "../components/css/signup-style.css";

export default function Signup() {
  return (
    <div class="outer-box">
      <div class="inner-box">
        <header class="signup-header">
          <h1>Signup</h1>
          <p>It just takes 30 seconds</p>
        </header>
        <main class="signup-body">
          <form action="#" class="" id="signup-form">
            <p>
              <label for="fullname">Full Name</label>
              <input
                type="text"
                id="fullname"
                placeholder="Aayush Kamtikar"
                required
              />
            </p>
            <p>
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="aayushkamtikar@gmail.com"
                required
              />
            </p>
            <p>
              <label for="password">Your New Passowrd</label>
              <input
                type="password"
                id="password"
                placeholder="Atleast 8 characters long"
                required
              />
            </p>
            <p>
              <input type="submit" id="submit" value="Create an account" />
            </p>
          </form>
        </main>
        <footer class="signup-footer">
          <p>
            Already have an account?
            <a href="#">Login</a>
          </p>
        </footer>
      </div>
      <div class="circle c1"></div>
      <div class="circle c2"></div>
    </div>
  );
}
