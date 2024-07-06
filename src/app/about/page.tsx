// src/app/about/page.tsx

import React from "react";
import Avatar from "../components/Avatar";

const AboutPage = () => {
  return (
    <div>
      <h1>About Us</h1>
      <Avatar
        size={100}
        person={{
          name: "Katsuko Saruhashi",
          imageId: "YfeOqp2",
        }}
      />
      <p>Welcome to the about page!</p>
    </div>
  );
};

export default AboutPage;
