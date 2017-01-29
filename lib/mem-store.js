const sleep = require('sleep');

const seneca = require('seneca')();
const basic = require('seneca-basic');
const entities = require('seneca-entity');

const _ = require('lodash');
seneca.use(basic);
seneca.use(entities);

const entity_name = 'my';
let my_entities = seneca.make(entity_name);

let keyMap = {};
let keyValues = [];

/**
 * save entity (wrapper save$)
 * @param {object} ent
 */
let save = (ent,callback) =>{
  let obj = ent;
  let mine = my_entities.make$(entity_name,obj);
  let isExistKey = false;
  if(_.has(ent,'key')){
    console.log('input key = ' + ent.key);
    console.log('keyValues = ' + keyValues);
    if(_.includes(keyValues,ent.key)){
      // FIXME async
      console.log('--------------key exists.');
      isExistKey = true;
    };
  };
  console.log('isExistKey = ' + isExistKey);
  if(isExistKey){
    mine.list$({key:ent.key},(err,lst)=>{
      lst[0].data$(obj);
      lst[0].save$((err,ent_) =>{
        console.log('keyValues = ' + keyValues);
        console.log(ent_);
      });
    });
    seneca.close();
  }else{
    mine.save$((err,ent_) =>{
      keyValues.push(ent_.key);
      keyMap[ent_.id] = ent_.key
      console.log('keyValues = ' + keyValues);
      console.log('keyMap = ' + JSON.stringify(keyMap));
      console.log(ent_);
    });
    seneca.close();
  };
};
let save_wrap = (ent) => {
  save(ent,(err,ent_)=>{
    let ret = ent_.id
    console.log(ret);
  });
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
let load_wrap = (id) => {
  load(id,(err,ent_)=>{
    let ret = ent_
    console.log(ret);
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
let list_wrap = (key) => {
  list({key: key},(err,lst_)=>{
    lst_.forEach((el)=>{
      console.log(el.data$(false));
    });
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

// save test
save_wrap(entity01);
sleep.sleep(1);

// load test
function load_test(ent) {
  save(ent,(err,ent_)=>{
    let ret_id = ent_.id;
    load_wrap(ret_id);
  });
}
load_test(entity02);
sleep.sleep(1);

// list test
let key = entity01.key;
function list_test(ent) {
  save(ent,(err,ent_)=>{
    list_wrap(key);
  });
}
list_test(entity03);
sleep.sleep(1);

