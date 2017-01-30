const seneca = require('seneca')();
const basic = require('seneca-basic');
const entities = require('seneca-entity');

const _ = require('lodash');
seneca.use(basic);
seneca.use(entities);

const entity_name = 'my';
let my_entities = seneca.make(entity_name);
let mine = my_entities.make$(entity_name);

let keyMap = {};
let keyValues = [];

/**
 * save entity (wrapper save$)
 * @param {object} ent
 */
let save = (ent,callback) =>{
  let obj = ent;
  let isExistKey = false;
  if(_.has(ent,'key')){
    //console.log('input key = ' + ent.key);
    //console.log('keyValues = ' + keyValues);
    if(_.includes(keyValues,ent.key)){
      console.log('--------------key exists.');
      isExistKey = true;
    }else{
      keyValues.push(ent.key);
    };
  };

  //console.log('isExistKey = ' + isExistKey);
  if(isExistKey){
    my_entities.list$({key:ent.key},(err,lst)=>{
      console.log(lst);
      console.log(obj);
      obj = Object.assign(lst[0],ent);
      mine.data$(obj);
      mine.save$((err,ent_) =>{
        console.log('keyValues = ' + keyValues);
        callback(null,ent_);
      });
    });
  }else{
    mine = my_entities.make$(entity_name,obj);
    mine.save$((err,ent_) =>{
      keyMap[ent_.id] = ent_.key
      console.log('keyValues = ' + keyValues);
      console.log('keyMap = ' + JSON.stringify(keyMap));
      console.log(ent_);
      callback(null,ent_);
    });
  };
};

/**
 * load entity by id (wrapper load$)
 * @param {string} id
 * @return {object}
 */
let load = (id,callback) =>{
  my_entities.load$(id,(err,ent_)=>{
    callback(err,ent_);
  });
};

/**
 * list entity by key (wrapper list$)
 * @param {string} key
 */
let list = (obj,callback) =>{
  my_entities.list$(obj,(err,lst_)=>{
    callback(err,lst_);
  });
};

// debug --------------------------------
// --------------------------------------
let entity01 = {
  key : 'sakai.memoru',
  name : 'sakai',
  age  : '51',
  email : 'sakai.memoru@gmail.com'
};
let entity02 = {
  key : 'sakai.memoru',
  name : 'sakai',
  age  : '52',
  address  : 'senda',
  email : 'sakai.memoru@gmail.com'
};

let entity03 = {
  key : 'sakai.memoru',
  name : 'sakai',
  age  : '53',
  email : 'sakai.memoru@gmail.com'
};


//seneca.ready(()=>{
// save test
save(entity01,(err,ent_)=>{
  let ret = ent_.id;
  console.log('ret=' + ret);
  save(entity02,(err,ent_)=>{
    ret = ent_.id;
    console.log('ret=' + ret);
    save(entity03,(err,ent_)=>{
      ret = ent_.id;
      console.log('ret=' + ret);
      console.log(ent_);
    });
  });
});
//}):

let load_wrap = (id) => {
  console.log('test load_wrap');
  load(id,(err,ent_)=>{
    let ret = ent_
    console.log(ret);
    list_test(entity03);
  });
};
let list_wrap = (key) => {
  console.log('test list_wrap');
  list({key: key},(err,lst_)=>{
    lst_.forEach((el)=>{
      console.log(el.data$(false));
    });
  });
};

// load test
function load_test(ent) {
  console.log('test load_test');
  save(ent,(err,ent_)=>{
    let ret_id = ent_.id;
    load_wrap(ret_id);
  });
}

// list test
function list_test(ent) {
  console.log('test list_test');
  save(ent,(err,ent_)=>{
    let key = entity01.key;
    list_wrap(key);
  });
}


