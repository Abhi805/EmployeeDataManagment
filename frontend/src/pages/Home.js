import React from "react";

const Home = () => {
  return (
    <div>
     

      {/* Hero Section */}
      <header className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1>Welcome to Employee Management System</h1>
          <p className="lead">Manage your employees efficiently and effortlessly</p>
          <a href="/signup" className="btn btn-light btn-lg mt-3">Get Started</a>
        </div>
      </header>

      {/* Features Section */}
      <section className="container my-5">
        <div className="row text-center">
          <div className="col-md-4">
            <i className="bi bi-people display-4 text-primary"></i>
            <h3 className="mt-3">Manage Employees</h3>
            <p>Easily add, edit, and remove employees from the system.</p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-bar-chart-line display-4 text-success"></i>
            <h3 className="mt-3">Track Performance</h3>
            <p>Monitor employee progress and performance analytics.</p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-shield-lock display-4 text-danger"></i>
            <h3 className="mt-3">Secure Data</h3>
            <p>Keep employee records safe and protected with security measures.</p>
          </div>
        </div>
      </section>

  
    </div>
  );
};

export default Home;
