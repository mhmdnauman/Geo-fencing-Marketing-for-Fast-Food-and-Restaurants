const express = require("express");
const router = express.Router();
const Items = require("../models/Items");
const puppeteer = require("puppeteer");
const request = require("request");
const cheerio = require("cheerio");
const cors = require("cors");

const ScrapLayers = () => {
  let type = [];
  let DealType = [];
  let title = [];
  let images = [];
  let price = [];

  const url = [
    "https://layers.pk/menu/",
    "https://layers.pk/menu/page/2/",
    "https://layers.pk/menu/page/3/",
    "https://layers.pk/menu/page/4/",
  ];
  for (let i = 0; i < url.length; i++) {
    request(url[i], async (error, response, html) => {
      if (error) console.log(error);

      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);
        $(
          'h2[class="woocommerce-loop-product__title xts-entities-title"]'
        ).each((index, elm) => {
          let ttl = $(elm).text().replace("\n\t\t\t\n\t\t\t\t", "");
          ttl = ttl.replace("\t\t\t\n\t\t", "");
          title.push(ttl);
        });

        //console.log(title);

        $('div[class="xts-product-image"]>img').each((index, elm) => {
          let imgURL = $(elm).attr("src");
          images.push(imgURL);
        });

        //console.log(images);

        $('span[class="woocommerce-Price-amount amount"]>bdi').each(
          (index, elm) => {
            let pr = $(elm).html();
            pr = pr.replace(
              `<span class="woocommerce-Price-currencySymbol">₨</span>&nbsp;`,
              ""
            );
            price.push(pr);
          }
        );

        //console.log(price);

        let Resname = "Layers";

        for (let j = 0; j < title.length; j++) {
          let find = title[j];
          let result = await Items.findOne({ find });
          if (title.length > 0 && !result) {
            price[j] = price[j].replace("Rs", "");
            const items = new Items({
              title: title[j],
              price: parseInt(price[j]),
              image: images[j],
              resname: Resname,
            });

            await items.save();
          }
        }
      }
    });
  }
};

module.exports = ScrapLayers;
