const express = require('express')
const soap = require('soap')
const bodyParser = require('body-parser')
const { route } = require('express/lib/application')
const app = express()
const port = 3000

//Cors enabled
app.use(function(req, res, next) {
    res. header("Access-Control-Allow-Origin", "*");
    res. header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//JSON Parse
app.use(bodyParser.json())

var router = express.Router()


router.post('/:methodIndex',function(req,res){
    const methodIndex = Number(req.params.methodIndex)
    const methods = ['Add', 'Multiply', 'Divide', 'Subtract']
    const url = 'http://www.dneonline.com/calculator.asmx?wsdl'
    const method = methods[methodIndex]
    //validation
    if (!method) {
      return res.send('Lütfen geçerli bir method gönderin')
    }
  
    const intA = req.body.intA
    const intB = req.body.intB
    //soap request
    soap.createClient(url, function(err, client) {
        const args = { intA: intA, intB: intB }
        client[method](args, function(err, result) {
          return res.send(result)
        });
    })
})

app.use('/',router)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

