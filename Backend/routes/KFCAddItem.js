const express = require("express");
const router = express.Router();
const Items = require("../models/Items");
const puppeteer = require("puppeteer");
const request = require("request");
const cheerio = require("cheerio");
const cors = require("cors");

const ScrapKFC = () => {
  let Resname = "KFC";

  (async () => {
    let URL = "https://www.kfcpakistan.com/category#everyday-value";

    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    let title = [];
    let description = [];
    let img = [];
    let price = [];

    await page.goto(URL, { waitUntil: "networkidle2" });

    let data = await page.evaluate(() => {
      title = document.querySelectorAll(
        'h1[class="MuiTypography-root jss169 MuiTypography-h1"]'
      );
      description = document.querySelectorAll(
        'p[class="MuiTypography-root jss170 MuiTypography-body1 MuiTypography-colorTextSecondary"]'
      );
      img = document.querySelectorAll('img[alt="product"]');
      price = document.querySelectorAll(
        'h5[class="MuiTypography-root jss171 MuiTypography-h5"]'
      );

      let titlelink = [];
      let descriptionlink = [];
      let imglink = [];
      let pricelink = [];

      for (let i = 0; i < title.length; i++) {
        titlelink[i] = title[i].textContent;
      }

      for (let i = 0; i < description.length; i++) {
        descriptionlink[i] = description[i].textContent;
      }

      for (let i = 0; i < img.length; i++) {
        imglink[i] = img[i].getAttribute("src");
      }

      for (let i = 0; i < price.length; i++) {
        pricelink[i] = price[i].textContent;
      }

      return {
        titlelink,
        descriptionlink,
        imglink,
        pricelink,
      };
    });

    //  console.log(data);

    for (let j = 0; j < data.imglink.length; j++) {
      let find = data.titlelink[j];
      let result = await Items.findOne({ find });
      if (data.titlelink.length > 0 && !result) {
        data.pricelink[j] = data.pricelink[j].replace("Rs", "");
        const items = new Items({
          title: data.titlelink[j],
          price: parseInt(data.pricelink[j]),
          image: data.imglink[j],
          description: data.descriptionlink[j],
          resname: Resname,
        });

        await items.save();
      }
    }

    await browser.close();
  })();

  //Page 2 Starts Here

  (async () => {
    let URL = "https://www.kfcpakistan.com/category#ala-carte-&-combos";

    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    let title = [];
    let description = [];
    let img = [];
    let price = [];

    await page.goto(URL, { waitUntil: "networkidle2" });

    let data = await page.evaluate(() => {
      title = document.querySelectorAll(
        'h1[class="MuiTypography-root jss169 MuiTypography-h1"]'
      );
      description = document.querySelectorAll(
        'p[class="MuiTypography-root jss170 MuiTypography-body1 MuiTypography-colorTextSecondary"]'
      );
      img = document.querySelectorAll('img[alt="product"]');
      price = document.querySelectorAll(
        'h5[class="MuiTypography-root jss171 MuiTypography-h5"]'
      );

      let titlelink = [];
      let descriptionlink = [];
      let imglink = [];
      let pricelink = [];

      for (let i = 0; i < title.length; i++) {
        titlelink[i] = title[i].textContent;
      }

      for (let i = 0; i < description.length; i++) {
        descriptionlink[i] = description[i].textContent;
      }

      for (let i = 0; i < img.length; i++) {
        imglink[i] = img[i].getAttribute("src");
      }

      for (let i = 0; i < price.length; i++) {
        pricelink[i] = price[i].textContent;
      }

      return {
        titlelink,
        descriptionlink,
        imglink,
        pricelink,
      };
    });

    //  console.log(data);

    for (let j = 0; j < data.imglink.length; j++) {
      let find = data.titlelink[j];
      let result = await Items.findOne({ find });
      if (data.titlelink.length > 0 && !result) {
        data.pricelink[j] = data.pricelink[j].replace("Rs", "");
        const items = new Items({
          title: data.titlelink[j],
          price: parseInt(data.pricelink[j]),
          image: data.imglink[j],
          description: data.descriptionlink[j],
          resname: Resname,
        });

        await items.save();
      }
    }

    await browser.close();
  })();

  //Page 3 Starts Here

  (async () => {
    let URL = "https://www.kfcpakistan.com/category#signature-boxes";

    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    let title = [];
    let description = [];
    let img = [];
    let price = [];

    await page.goto(URL, { waitUntil: "networkidle2" });

    let data = await page.evaluate(() => {
      title = document.querySelectorAll(
        'h1[class="MuiTypography-root jss169 MuiTypography-h1"]'
      );
      description = document.querySelectorAll(
        'p[class="MuiTypography-root jss170 MuiTypography-body1 MuiTypography-colorTextSecondary"]'
      );
      img = document.querySelectorAll('img[alt="product"]');
      price = document.querySelectorAll(
        'h5[class="MuiTypography-root jss171 MuiTypography-h5"]'
      );

      let titlelink = [];
      let descriptionlink = [];
      let imglink = [];
      let pricelink = [];

      for (let i = 0; i < title.length; i++) {
        titlelink[i] = title[i].textContent;
      }

      for (let i = 0; i < description.length; i++) {
        descriptionlink[i] = description[i].textContent;
      }

      for (let i = 0; i < img.length; i++) {
        imglink[i] = img[i].getAttribute("src");
      }

      for (let i = 0; i < price.length; i++) {
        pricelink[i] = price[i].textContent;
      }

      return {
        titlelink,
        descriptionlink,
        imglink,
        pricelink,
      };
    });

    //  console.log(data);

    for (let j = 0; j < data.imglink.length; j++) {
      let find = data.titlelink[j];
      let result = await Items.findOne({ find });
      if (data.titlelink.length > 0 && !result) {
        data.pricelink[j] = data.pricelink[j].replace("Rs", "");
        const items = new Items({
          title: data.titlelink[j],
          price: parseInt(data.pricelink[j]),
          image: data.imglink[j],
          description: data.descriptionlink[j],
          resname: Resname,
        });

        await items.save();
      }
    }

    await browser.close();
  })();

  //Page 4 Starts Here

  (async () => {
    let URL = "https://www.kfcpakistan.com/category#sharing";

    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    let title = [];
    let description = [];
    let img = [];
    let price = [];

    await page.goto(URL, { waitUntil: "networkidle2" });

    let data = await page.evaluate(() => {
      title = document.querySelectorAll(
        'h1[class="MuiTypography-root jss169 MuiTypography-h1"]'
      );
      description = document.querySelectorAll(
        'p[class="MuiTypography-root jss170 MuiTypography-body1 MuiTypography-colorTextSecondary"]'
      );
      img = document.querySelectorAll('img[alt="product"]');
      price = document.querySelectorAll(
        'h5[class="MuiTypography-root jss171 MuiTypography-h5"]'
      );

      let titlelink = [];
      let descriptionlink = [];
      let imglink = [];
      let pricelink = [];

      for (let i = 0; i < title.length; i++) {
        titlelink[i] = title[i].textContent;
      }

      for (let i = 0; i < description.length; i++) {
        descriptionlink[i] = description[i].textContent;
      }

      for (let i = 0; i < img.length; i++) {
        imglink[i] = img[i].getAttribute("src");
      }

      for (let i = 0; i < price.length; i++) {
        pricelink[i] = price[i].textContent;
      }

      return {
        titlelink,
        descriptionlink,
        imglink,
        pricelink,
      };
    });

    //  console.log(data);

    for (let j = 0; j < data.imglink.length; j++) {
      let find = data.titlelink[j];
      let result = await Items.findOne({ find });
      if (data.titlelink.length > 0 && !result) {
        data.pricelink[j] = data.pricelink[j].replace("Rs", "");
        const items = new Items({
          title: data.titlelink[j],
          price: parseInt(data.pricelink[j]),
          image: data.imglink[j],
          description: data.descriptionlink[j],
          resname: Resname,
        });

        await items.save();
      }
    }

    await browser.close();
  })();

  //Page 5 Starts Here

  (async () => {
    let URL = "https://www.kfcpakistan.com/category#snacks-&-beverages";

    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    let title = [];
    let description = [];
    let img = [];
    let price = [];

    await page.goto(URL, { waitUntil: "networkidle2" });

    let data = await page.evaluate(() => {
      title = document.querySelectorAll(
        'h1[class="MuiTypography-root jss169 MuiTypography-h1"]'
      );
      description = document.querySelectorAll(
        'p[class="MuiTypography-root jss170 MuiTypography-body1 MuiTypography-colorTextSecondary"]'
      );
      img = document.querySelectorAll('img[alt="product"]');
      price = document.querySelectorAll(
        'h5[class="MuiTypography-root jss171 MuiTypography-h5"]'
      );

      let titlelink = [];
      let descriptionlink = [];
      let imglink = [];
      let pricelink = [];

      for (let i = 0; i < title.length; i++) {
        titlelink[i] = title[i].textContent;
      }

      for (let i = 0; i < description.length; i++) {
        descriptionlink[i] = description[i].textContent;
      }

      for (let i = 0; i < img.length; i++) {
        imglink[i] = img[i].getAttribute("src");
      }

      for (let i = 0; i < price.length; i++) {
        pricelink[i] = price[i].textContent;
      }

      return {
        titlelink,
        descriptionlink,
        imglink,
        pricelink,
      };
    });

    //  console.log(data);

    for (let j = 0; j < data.imglink.length; j++) {
      let find = data.titlelink[j];
      let result = await Items.findOne({ find });
      if (data.titlelink.length > 0 && !result) {
        data.pricelink[j] = data.pricelink[j].replace("Rs", "");
        const items = new Items({
          title: data.titlelink[j],
          price: parseInt(data.pricelink[j]),
          image: data.imglink[j],
          description: data.descriptionlink[j],
          resname: Resname,
        });

        await items.save();
      }
    }

    await browser.close();
  })();

  //Page 6 Starts Here

  (async () => {
    let URL = "https://www.kfcpakistan.com/category#midnight";

    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    let title = [];
    let description = [];
    let img = [];
    let price = [];

    await page.goto(URL, { waitUntil: "networkidle2" });

    let data = await page.evaluate(() => {
      title = document.querySelectorAll(
        'h1[class="MuiTypography-root jss169 MuiTypography-h1"]'
      );
      description = document.querySelectorAll(
        'p[class="MuiTypography-root jss170 MuiTypography-body1 MuiTypography-colorTextSecondary"]'
      );
      img = document.querySelectorAll('img[alt="product"]');
      price = document.querySelectorAll(
        'h5[class="MuiTypography-root jss171 MuiTypography-h5"]'
      );

      let titlelink = [];
      let descriptionlink = [];
      let imglink = [];
      let pricelink = [];

      for (let i = 0; i < title.length; i++) {
        titlelink[i] = title[i].textContent;
      }

      for (let i = 0; i < description.length; i++) {
        descriptionlink[i] = description[i].textContent;
      }

      for (let i = 0; i < img.length; i++) {
        imglink[i] = img[i].getAttribute("src");
      }

      for (let i = 0; i < price.length; i++) {
        pricelink[i] = price[i].textContent;
      }

      return {
        titlelink,
        descriptionlink,
        imglink,
        pricelink,
      };
    });

    //  console.log(data);

    for (let j = 0; j < data.imglink.length; j++) {
      let find = data.titlelink[j];
      let result = await Items.findOne({ find });
      if (data.titlelink.length > 0 && !result) {
        data.pricelink[j] = data.pricelink[j].replace("Rs", "");
        const items = new Items({
          title: data.titlelink[j],
          price: parseInt(data.pricelink[j]),
          image: data.imglink[j],
          description: data.descriptionlink[j],
          resname: Resname,
        });

        await items.save();
      }
    }

    await browser.close();
  })();
};

module.exports = ScrapKFC;
