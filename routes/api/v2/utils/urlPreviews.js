import fetch from 'node-fetch';

import parser from 'node-html-parser';

async function getURLPreview(url){
    let url = req.query.url;
  try {
    let response = await fetch(url);
    let pageText = await response.text();
    let htmlPage = parser.parse(pageText);
    let metaTags = htmlPage.querySelectorAll("meta");
    let ogTitle = "";
    let ogImage = "";
    let ogUrl = "";
    let ogDescription = "";
    let ogSiteName = "";
    metaTags.forEach(tag => {
      if (tag.hasAttribute("property")) {
        let ogProperty = tag.getAttribute("property");
        console.log(ogProperty);
        let ogContent = tag.getAttribute("content");
        let ogTag = ogProperty.split(":");
        if (ogTag[1] == "title") {
          ogTitle = ogContent;
        }
        else if (ogTag[1] == "image" && ogTag.length == 2) {
          ogImage = ogContent;
          console.log(ogImage);
        }
        else if (ogTag[1] == "url") {
          ogUrl = ogContent;
        }
        else if (ogTag[1] == "description") {
          ogDescription = ogContent;
        }
        else if (ogTag[1] == "sitename" || ogTag[1] == "site_name") {
          ogSiteName = ogContent;
        }
      }
    });
    
    function titleElement(__title) {
      if (ogTitle == "" && htmlPage.querySelector("title") != null) {
        ogTitle == htmlPage.querySelector("title").innerHTML;
      }
      else if (ogTitle == "" && htmlPage.querySelector("title") == null) {
        ogTitle == url;
      }
      return `<p><strong>${ogTitle}</strong></p>`;
    }

    function showImgElement(__imgElement) {
      if (__imgElement == "") {
        return "";
      }
      else {
        return `<img src=${__imgElement} style="max-height: 200px; max-width: 270px;"></a>`;
      }
    }

    function showDescElement(__descElement) {
      if (__descElement == "") {
        return "";
      }
      else {
        return `<p>${__descElement}</p>`;
      }
    }

    let html = `
    <html>
    <body>
      <div style="max-width: 300px; border: solid 1px; padding: 3px; text-align: center;">
        <a href=${ogUrl ? ogUrl : url} />
        ${titleElement(ogTitle)}
        ${showDescElement(ogSiteName)}
        ${showImgElement(ogImage)}
        ${showDescElement(ogDescription)}
      </div>
    </body>
    </html>
    `;
    res.send(html);
  }
  catch(err) {
    console.log(err);
    res.status(500).send("Error finding images");
  }
}

export default getURLPreview;