const cheerio = require('cheerio');
const axios = require('axios');
const fs = require("fs");
/*
const url = 'https://www.dedicatedbrand.com/en/men/t-shirts';
const products = [];

async function getProducts(pageUrl) {
  try {
    const response = await axios.get(pageUrl || url);
    const $ = cheerio.load(response.data);
    const brand_name = 'dedicated';
    console.log(brand_name);

    const p = $('.productList-container .productList');
    p.each(function () {
      const link = $(this).find('.productList-link').attr('href');
      const img = $(this).find('div img').attr('src');
      const title = $(this).find('.productList-title').text().trim().replace(/\s/g, ' ');
      priceString = $(this).find('.productList-price').text().trim();
      priceMatch = priceString.match(/\d+(\.\d+)?/);
      price = priceMatch ? parseFloat(priceMatch[0]) : null;


      products.push({ brand_name, link, img, title, price });
    });

    const nextPageUrl = $(".next a").attr("href");
    if (nextPageUrl) {
      const nextPage = url + nextPageUrl;
      await getProducts(nextPage);
    }

    fs.writeFile('dedicated.json', JSON.stringify(products), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Scraped data saved into dedicated.json');
      }
    });

    console.log(products);
  } catch (error) {
    console.error(error);
  }
}

getProducts();


*/
/*
const cheerio= require('cheerio');
 const axios = require('axios');
 const fs=require("fs")

  const url='https://www.dedicatedbrand.com/en/men/t-shirts'
 
  const products=[]

   async function getProducts(){
     try{
       const response= await axios.get(url);
       const $= cheerio.load(response.data)
       const brand_name='dedicated';
       console.log(brand_name);

       const p=$('.productList-container .productList');
       p.each(function(){
           link = $(this).find('.productList-link').attr('href')
           img= $(this).find('.img').attr('src')
           title=$(this).find('.productList-title').text().trim().replace(/\s/g, ' ')
           

           products.push({brand_name,link,img,title,price})
       });
       if ($(".next a").length>0){
           next_page=url +$(".next a").attr("href");
           getProducts(next_page);
       }
          fs.writeFile('dedicated.json', JSON.stringify(products),(err) => {
              if (err) {
                  console.log(err)
              } else {
                  console.log('Scraped data saved into dedicated.json')
                  }
              })

       console.log(products);


     }catch(error){
       console.error(error);
     }

   }

   getProducts();
   */

//  //address.paris
   const url='https://adresse.paris/630-toute-la-collection'
   const baseUrl= ""
   const products=[]

   async function getProducts(){
     try{
       const response= await axios.get(url);
       const $= cheerio.load(response.data)
       const brand_name=$('#header_logo').find('a').attr('title')
       console.log(brand_name);

       const p=$('.product-container');
       p.each(function(){
           link = $(this).find('h2 a').attr('href')
           img= $(this).find('a img').attr('src')
           title=$(this).find('.product-name').text().trim()
           
           priceString = $(this).find('div span').text().trim();
           priceMatch = priceString.match(/\d+(\.\d+)?/);
           price = priceMatch ? parseFloat(priceMatch[0]) : null;


           products.push({brand_name,link,img,title,price})
       });
        console.log(products);
      if ($(".next a").length>0){
                  next_page=url +$(".next a").attr("href");
                   getProducts(next_page);
               }
      fs.writeFile('address.json', JSON.stringify(products),(err) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Scraped data saved into address.json')
                          }
      })
                      
      console.log(products);
    



    }catch(error){
       console.error(error);
     }

   }

   getProducts();


//loom
//  const url='https://www.loom.fr/collections/vestiaire-homme'
//  const baseUrl= ""
//  const products=[]

//  async function getProducts(){
//    try{
//      const response= await axios.get(url);
//      const $= cheerio.load(response.data)
//      const brand_name='Loom';
//      console.log(brand_name);

//      const p=$('.flex flex-col');
//      p.each(function(){
//          link = $(this).find('.w-full relative group bg-gray-100').attr('href')
//          img= $(this).find('img').attr('src')
//          title=$(this).find('h2 .typo-body-sans-small-sans lg:typo-body-sans').text().trim()
//          price=$(this).find('p .typo-body-sans-small-sans lg:typo-body-sans').text().trim().replace(/^\s*\$?\s*/, '')

//          products.push({brand_name,link,img,title,price})
// });
    
//           console.log(products);
//           fs.writeFile('loom.json', JSON.stringify(products), (err) => {
//                       if (err) {
//                             console.log(err)
//                      } else {
//                             console.log('Scraped data saved into loom.json')
//                           }
//                       })
    
    
    

//    }catch(error){
//      console.error(error);
//   }

//  }

//  getProducts();


//coletel paris
  

  /*const url='https://coteleparis.com/collections/tous-nos-produits'
  const products=[]

   async function getProducts(){
     try{
       const response= await axios.get(url);
       const $= cheerio.load(response.data)
       const brand_name='Côtelé';
       console.log(brand_name);

       const p=$('.product-card');
       p.each(function(){
           link = $(this).find('.product-card__img--wrapper').attr('href')
           img= $(this).find('img').attr('src')
           title=$(this).find('.product-card__details--title').text().trim().replace(/\s/g, ' ')
          
       
/*
          priceString = $(this).find('.product-card__details--price').text().trim();
          priceMatch = priceString.match(/\d+(\.\d+)?/);
          price = priceMatch ? parseFloat(priceMatch[0]) : null;


           products.push({brand_name,link,img,title,price})
       });
       if ($(".next a").length>0){
           next_page=url +$(".next a").attr("href");
           getProducts(next_page);
       }
          fs.writeFile('cotele.json', JSON.stringify(products),(err) => {
              if (err) {
                  console.log(err)
              } else {
                  console.log('Scraped data saved into cotele.json')
                  }
              })
                
       console.log(products);
    

     }catch(error){
       console.error(error);
     }

   }

   getProducts();
*/

/*
   const url='https://www.dedicatedbrand.com/en/women/all-women'
  const products=[]

   async function getProducts(){
     try{
       const response= await axios.get(url);
       const $= cheerio.load(response.data)
       const brand_name='Dedicated Paris';
       console.log(brand_name);

       const p=$('.productList slides');
       p.each(function(){
           link = $(this).find('a .productList-link').attr('href')
           img= $(this).find('img').attr('src')
           title=$(this).find('.productList-detailsno>.productList-title').text().trim().replace(/\s/g, ' ')
          
           

          priceString = $(this).find('.productList-price').text().trim();
          priceMatch = priceString.match(/\d+(\.\d+)?/);
          price = priceMatch ? parseFloat(priceMatch[0]) : null;


           products.push({brand_name,link,img,title,price})
       });
       if ($(".next a").length>0){
           next_page=url +$(".next a").attr("href");
           getProducts(next_page);
       }
          fs.writeFile('dedicated.json', JSON.stringify(products),(err) => {
              if (err) {
                  console.log(err)
              } else {
                  console.log('Scraped data saved into dedicated.json')
                  }
              })
                
       console.log(products);
    

     }catch(error){
       console.error(error);
     }

   }

   getProducts();
   */
