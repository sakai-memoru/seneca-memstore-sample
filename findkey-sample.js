const _ = require('lodash');
const test = {
  'key' : 'sakai.memoru',
  'name' : 'sakai',
  'age' : '51',
  'email' : 'sakai.memoru@gmail.com'
};

let ret = _.findKey(test,(val) => val === 'sakai.memoru');
console.log(ret);
ret = _.findKey(test,(val) => val === 'sakai');
console.log(ret);
ret = _.findKey(test,(val) => val === '51');
console.log(ret);

ret = _.some([test],{'key':'sakai.memoru'});
console.log(ret);

//ret = _.where(test,{'key':'sakai.memoru'});
//console.log(ret);

