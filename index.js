const express = require('express')
const libgen = require('libgen')
 
const app = express()
 


app.get('/', (req, res) => {
   console.log("server listening on port 5000")
})

app.get('/api/getbook', (req, res) => {
   var q = req.query.q;
   var o = req.query.o;
   console.log(q+o);
   var book = [];

   (async() => {
       try {
         var urlString = await libgen.mirror();
         console.log(urlString);
         var options = {
            mirror: urlString,
            query: q,
            count: 10,
            sort_byte: o
         }
         let data = await libgen.search(options);
         if(data.length){
            data.map(data=>{
            book.push({
               title: data.title,
               authors: data.author,
               description: data.descr, 
               imageLinks: urlString+"/covers/"+ data.urlcover, 
               downloadLink: "http://library.lol/main/"+ data.md5
            })
            })
            res.json(book);
         } else res.json("");
         
       } catch (err) {
         console.error(err);
         
     }
   })();
})
 
app.listen(5000, () => {
   console.log('server listening on port 5000')
})
