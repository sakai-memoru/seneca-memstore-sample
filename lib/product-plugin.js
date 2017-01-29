var products = this.make('products');
this.add('role:product,cmd:add',(msg_obj,response_cb)=>{
  products = Object.assign(products,args.req$.body);
  products.save$((err,ent)=>{
    if(err){
      console.dir(err);
      response_cb(err,{error : 'save error occured'});
    }
    response_cb(null,{_id : ent.id});
  });
});
