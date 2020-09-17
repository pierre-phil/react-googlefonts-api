import React, { useState, useEffect } from "react";

const Recent = () => {
  const [recentFonts, setRecentFonts] = useState([]);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_GFONTS_API_KEY;
    const url = `https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCmgOX-4uVu7DlmjOWrO-xD_dC_0-raOFc&sort=date`;
    // fonts triés par date

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("font introuvable");
      })
      .then((result) => {
        setRecentFonts(result.items.slice(0, 10));
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  console.log("recentFonts", recentFonts);

  return (
    <section className="row">
      {recentFonts.map((el) => {
        return (
          <article className="col-lg-6 mb-3">
            <div key={el.family} className="shadow p-3">
              <h4 className="d-flex align-items-center justify-content-between">
                <span>{el.family}</span>
                <small>{`${el.variants.length} variant(s)`}</small>
              </h4>
              <p>
                <span className="badge bg-dark">{el.category}</span>
              </p>
              <p className="sample">text sample here</p>
              <a
                rel="noopener noreferrer"
                target="_blank"
                className="text-danger"
                href={`https://fonts.google.com/specimen/${el.family}`}
              >
                Voir sur Google Fonts
              </a>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Recent;