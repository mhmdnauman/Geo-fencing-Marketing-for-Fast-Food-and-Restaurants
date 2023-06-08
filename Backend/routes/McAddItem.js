const express = require("express");
const router = express.Router();
const Items = require("../models/Items");
const puppeteer = require("puppeteer");
const request = require("request");
const cheerio = require("cheerio");
const cors = require("cors");

const ScrapMcDonalds = () => {
  let Resname = "McDonalds";
  let title = [];
  let images = [];
  let price = [];

  const url = [
    "https://www.mcdelivery.com.pk/pk/browse/menu.html?daypartId=1&catId=12",
    "https://www.mcdelivery.com.pk/pk/browse/menu.html?daypartId=1&catId=1",
    "https://www.mcdelivery.com.pk/pk/browse/menu.html?daypartId=1&catId=2",
    "https://www.mcdelivery.com.pk/pk/browse/menu.html?daypartId=1&catId=18",
    "https://www.mcdelivery.com.pk/pk/browse/menu.html?daypartId=1&catId=19",
    "https://www.mcdelivery.com.pk/pk/browse/menu.html?daypartId=1&catId=11",
    "https://www.mcdelivery.com.pk/pk/browse/menu.html?daypartId=1&catId=10",
    "https://www.mcdelivery.com.pk/pk/browse/menu.html?daypartId=1&catId=6",
    "https://www.mcdelivery.com.pk/pk/browse/menu.html?daypartId=1&catId=4",
    "https://www.mcdelivery.com.pk/pk/browse/menu.html?daypartId=1&catId=5",
    "https://www.mcdelivery.com.pk/pk/browse/menu.html?daypartId=1&catId=3",
    "https://www.mcdelivery.com.pk/pk/browse/menu.html?daypartId=1&catId=14",
    "https://www.mcdelivery.com.pk/pk/browse/menu.html?daypartId=1&catId=17",
    "https://www.mcdelivery.com.pk/pk/browse/menu.html?daypartId=1&catId=8",
    "https://www.mcdelivery.com.pk/pk/browse/menu.html?daypartId=2&catId=22",
    "https://www.mcdelivery.com.pk/pk/browse/menu.html?daypartId=2&catId=2",
    "https://www.mcdelivery.com.pk/pk/browse/menu.html?daypartId=2&catId=18",
    "https://www.mcdelivery.com.pk/pk/browse/menu.html?daypartId=2&catId=6",
    "https://www.mcdelivery.com.pk/pk/browse/menu.html?daypartId=2&catId=4",
    "https://www.mcdelivery.com.pk/pk/browse/menu.html?daypartId=2&catId=5",
    "https://www.mcdelivery.com.pk/pk/browse/menu.html?daypartId=2&catId=3",
    "https://www.mcdelivery.com.pk/pk/browse/menu.html?daypartId=2&catId=14",
    "https://www.mcdelivery.com.pk/pk/browse/menu.html?daypartId=2&catId=17",
  ];

  for (let i = 0; i < url.length; i++) {
    request(url[i], async (error, response, html) => {
      if (error) console.log(error);

      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);

        $(
          'div[class = "panel panel-default panel-product"]>div[class = "panel-body"]>h5[class = "product-title"]'
        ).each((index, elm) => {
          let ttl = $(elm).text();
          title.push(ttl);
        });

        $(
          'div[class = "panel panel-default panel-product"]>div[class = "panel-body"]>img[class = "img-block"]'
        ).each((index, elm) => {
          let imgURL = $(elm).attr("src");
          images.push(imgURL);
        });

        $(
          'div[class = "panel panel-default panel-product"]>div[class = "panel-footer"]>div[class = "row row-narrow"]>div[class = "product-info"]>div[class = "product-details"]>div[class = "product-cost"]>span[class = "starting-price"]'
        ).each((index, elm) => {
          let pr = $(elm).text();
          price.push(pr);
        });
      }
      let items = new Items();
      for (let j = 0; j < title.length; j++) {
        price[j] = price[j].replace("Rs", "");
        items = ({
          title: title[j],
          price: parseInt(price[j]),
          image: images[j],
          resname: Resname,
        });

      }
      const McItem = new Items(items);
      await McItem.save();
    });
  }

  // let KFCtype = [];
  // let KFCDealType = [];
  // let KFCtitle = [];
  // let KFCimages = [];
  // let KFCprice = [];

  // const KFCurl = [
  //   "https://www.kfcpakistan.com/category#everyday-value",
  //   "https://www.kfcpakistan.com/category#ala-carte-&-combos",
  //   "https://www.kfcpakistan.com/category#signature-boxes",
  //   "https://www.kfcpakistan.com/category#sharing",
  //   "https://www.kfcpakistan.com/category#snacks-&-beverages",
  //   "https://www.kfcpakistan.com/category#midnight",
  // ];

  // for (let i = 0; i < KFCurl.length; i++) {
  //   request(KFCurl[i], async (error, response, html) => {
  //     if (error) console.log(error);

  //     if (!error && response.statusCode === 200) {
  //       const $ = cheerio.load(html);

  //       $('h1[class="MuiTypography-root jss202 MuiTypography-h1"]').each(
  //         (index, elm) => {
  //           let ttl = $(elm).text();
  //           KFCtitle.push(ttl);
  //         }
  //       );

  //       $('div[class="MuiGrid-root jss205 MuiGrid-item"]>img').each(
  //         (index, elm) => {
  //           let imgURL = $(elm).attr("src");
  //           KFCimages.push(imgURL);
  //         }
  //       );

  //       $('h5[class="MuiTypography-root jss204 MuiTypography-h5"]').each(
  //         (index, elm) => {
  //           let pr = $(elm).text();
  //           KFCprice.push(pr);
  //         }
  //       );
  //     }

  //     for (let j = 0; j < title.length; j++) {
  //       let find = title[j];
  //       let result = await Items.findOne({ find });
  //       if (title.length > 0 && !result) {
  //         price[j] = price[j].replace("Rs", "");
  //         const items = new Items({
  //           title: title[j],
  //           price: parseInt(price[j]),
  //           image: images[j],
  //           resname: Resname,
  //         });

  //         await items.save();
  //       }
  //     }
  //   });
  // }
};

module.exports = ScrapMcDonalds;
