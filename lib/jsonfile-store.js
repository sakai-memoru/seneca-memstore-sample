var seneca = require('seneca')();
seneca.use('./lib/product-plugin');
seneca.use('entity');
seneca.use('jsonfile-store',{
  folder: '../data'
});

seneca.act('role:web',{
  use : {
    prefix: '',
    pin : 'role:products,cmd:*',
    map : {
      add : {
        POST : true,
        alias : '/products/add'
      }
    }
  }
});


