var mongoose = require('mongoose');
let Quote = require('../quoteModel'); 

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp); 
describe('Quotes', () => {
    /*
    * Test the /GET route
    */
   describe('/GET quotes', () => {
       it('it should GET all the quotes', (done) => {
           chai.request(server)
                .get('/api/quotes')
                .end((err, res) => {
                    res.should.have.status(200); 
                    res.body.should.have.property('message').eql("Quotes retrieved successfully"); 
                done(); 
                }); 
       }); 
   }); 
   /*
    * Test the /POST route
    */
   describe('/POST quotes', () => {
       it('it should POST a quote', (done) => {
           let quote = {
               name: "karthika", 
               text: "Never give up"
           }
           chai.request(server)
            .post('/api/quotes')
            .send(quote)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message').eql('New quote created!'); 
             done(); 
            }); 
       }); 
   }); 
   /*
    * Test the /PUT/:id route
    */
   describe('/PUT/:id quotes', () => {
       it('it should UPDATE a quote by the given id', (done) => {
           let quote = new Quote({name: "Karthika", text: "Failure is first step to success"})
           quote.save((err, book) => {
               chai.request(server)
               .put('/api/quotes/' + quote.id)
               .send({name: "Karthika", text: "Next is persistence"})
               .end((err, res) => {
                   res.should.have.status(200); 
                   res.body.should.have.property('message').eql('Quote Info updated'); 
                 done(); 
               }); 
           }); 
       }); 
   }); 

   /*
    * Test the /DELETE/:id route
    */
   describe('/DELETE/:id quotes', () => {
    it('it should UPDATE a quote by the given id', (done) => {
        let quote = new Quote({name: "Karthika", text: "Study Hard"})
        quote.save((err, book) => {
            chai.request(server)
            .delete('/api/quotes/' + quote.id)
            .end((err, res) => {
                res.should.have.status(200); 
                res.body.should.have.property('message').eql('Quote deleted'); 
              done(); 
            }); 
        }); 
    }); 
}); 

}); 