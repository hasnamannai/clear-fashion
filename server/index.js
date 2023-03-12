const PORT = 8000
const axios= require('axios')
const cheerio= require('cheerio')
const express= require('express')
const fs = require('fs')

const app= express()

url='https://coteleparis.com/collections/femme?filter.v.availability=1&filter.p.m.gender.type=Femme&sort_by=manual'
axios.get(url)
    .then(response => {
        const html =response.data
        const $ =cheerio.load(html)
        const articles =[]
        
        $('.collection__grid >.collection__grid-item>.product-card',html).each(function(){
            title=$(this).find('.product-card__details--title').text().trim()
            image=$(this).find('img').attr('src')
            price=$(this).find('.product-card__details>.product-card__details--price').text().trim()
            
            
            articles.push({
                title,
                image,
                price
            })
        

        })
        /*
        $('.collection__grid >.collection__grid-item>.product-card').map((i,el)=>{
            const title =$(el).find('.product-card__details>.product-card__details--infos>.product-card__details--title').text()
            const image =$(el).find('a').attr('href')
            const price=$(el).find('.product-card__details>.product-card__details--price').text()
            products.push({
              title,
              image,
              price
            })
          });*/
        console.log(articles)

        fs.writeFile('scraped_data.json', JSON.stringify(articles), (err) => {
            if (err) {
              console.log(err)
            } else {
              console.log('Scraped data saved into scraped_data.json')
            }
          })

}).catch(err=> console.log(err))

app.listen(PORT, ()=> console.log(`server running on PORT ${PORT}`))