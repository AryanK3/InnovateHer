"use client"; // Mark this file as a client component

import React from "react";

const FraternityRatings = () => {
  const submitComment = (fraternity) => {
    const commentText = document.getElementById(`${fraternity}-comments`).value;
    if (commentText.trim() === "") {
      alert("Please enter a comment before submitting.");
    } else {
      alert(`Comment for ${fraternity} submitted: ${commentText}`);
      document.getElementById(`${fraternity}-comments`).value = "";
    }
  };

  return (
    <div className="container" style={{ width: "80%", margin: "auto", paddingTop: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Purdue Fraternity Ratings</h1>

      {/* Alpha Phi Delta Fraternity */}
      <div className="fraternity" style={{
        backgroundColor: "white", padding: "20px", margin: "15px 0", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)"
      }}>
        <h2>Alpha Phi Delta</h2>

        {/* Star Rating */}
        <div className="star-rating" style={{ margin: "10px 0" }}>
          {[5, 4, 3, 2, 1].map((rating) => (
            <span key={`alpha-${rating}`}>
              <input type="radio" id={`alpha-${rating}`} name="alpha" value={rating} style={{ display: "none" }} />
              <label htmlFor={`alpha-${rating}`} style={{
                fontSize: "20px", color: "#ddd", cursor: "pointer"
              }}>
                ★
              </label>
            </span>
          ))}
        </div>

        {/* Comments Section */}
        <div className="comments-section" style={{ marginTop: "15px" }}>
          <textarea
            id="alpha-comments"
            placeholder="Add a comment..."
            style={{ width: "100%", height: "100px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <button
            onClick={() => submitComment("alpha")}
            style={{
              padding: "10px 15px", backgroundColor: "#007BFF", color: "white", border: "none",
              borderRadius: "5px", cursor: "pointer"
            }}
          >
            Submit
          </button>
        </div>
      </div>

      {/* Beta Theta Pi Fraternity */}
      <div className="fraternity" style={{
        backgroundColor: "white", padding: "20px", margin: "15px 0", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)"
      }}>
        <h2>Beta Theta Pi</h2>

        {/* Star Rating */}
        <div className="star-rating" style={{ margin: "10px 0" }}>
          {[5, 4, 3, 2, 1].map((rating) => (
            <span key={`beta-${rating}`}>
              <input type="radio" id={`beta-${rating}`} name="beta" value={rating} style={{ display: "none" }} />
              <label htmlFor={`beta-${rating}`} style={{
                fontSize: "20px", color: "#ddd", cursor: "pointer"
              }}>
                ★
              </label>
            </span>
          ))}
        </div>

        {/* Comments Section */}
        <div className="comments-section" style={{ marginTop: "15px" }}>
          <textarea
            id="beta-comments"
            placeholder="Add a comment..."
            style={{ width: "100%", height: "100px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <button
            onClick={() => submitComment("beta")}
            style={{
              padding: "10px 15px", backgroundColor: "#007BFF", color: "white", border: "none",
              borderRadius: "5px", cursor: "pointer"
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FraternityRatings;
