const seneca = require('seneca')();

seneca.use('basic');
seneca.use('entity');


seneca.ready(()=>{
  let fruit_entity = seneca.make$('fruit'); //fruit entity
  
  let apple = fruit_entity.make$();
  apple.key = 'apple';
  apple.name = 'fuji';
  apple.price = 100;

  apple.save$((err,ent)=>{
    id = ent.id;
    console.log('entity = ' + ent.id);

    let entity = seneca.make$('fruit');
    entity.load$(id,(err,entity)=>{
      console.log(entity);
      entity.price = 90;
      entity.save$();
      entity.load$(id,(err,entity)=>{
        console.log(entity);
      });
    });
  });
  
  
  
  let banana = fruit_entity.make$();
  banana.key = 'banana';
  banana.name = 'banana';
  banana.price = 120;

  banana.save$((err,ent)=>{
    let id = ent.id;
    console.log('entity = ' + ent.id);

    let entity = seneca.make$('fruit');
    entity.load$(id,(err,entity)=>{
      console.log(entity);
    });
  });

});
