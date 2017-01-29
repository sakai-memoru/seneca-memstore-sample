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

/**
 * save entity (wrapper save$)
 * @param {object} ent
 */
let save = (ent,callback) =>{
  let obj = ent;
  if(_.has(ent,'key')){
    console.log('input key = ' + ent.key);
    if(_.includes(keyMap,ent.key)){
      // FIXME async
      console.log('--------------includes');
      let my_id = _.findKey(keyMap,(keyVal)=> keyVal === ent.key)
      my_entities.load$(my_id,(err,ent_)=>{
        obj = Object.assign(ent_,ent);
      });
    };
  };
  let mine = my_entities.make$(entity_name,obj);
  mine.save$((err,ent_) =>{
    keyMap[ent_.id] = key;
    console.log(keyMap);
  });
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
    //console.log(ret);
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
sleep.sleep(3);

// load test
function load_test(ent) {
  save(ent,(err,ent_)=>{
    let ret_id = ent_.id;
    load_wrap(ret_id);
  });
}
load_test(entity02);
sleep.sleep(3);

// list test
let key = entity01.key;
function list_test(ent) {
  save(ent,(err,ent_)=>{
    list_wrap(key);
  });
}
list_test(entity03);
sleep.sleep(3);

