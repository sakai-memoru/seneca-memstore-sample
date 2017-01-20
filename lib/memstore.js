const seneca = require('seneca')();

seneca.use('seneca-basic');
seneca.use('seneca-entity');

seneca.ready(()=>{
  let apple = seneca.make$('fruit'); //fruit entity
  apple.name = 'I hava an apple.';
  apple.price = 100;
  let id = '';

  apple.save$((err,apple)=>{
    id = apple.id;
    console.log('apple.id = ' + apple.id);
  
    let entity = seneca.make$('fruit');
    entity.load$(id,(err,entity)=>{
      console.log(entity.name);
    });
  });


});
