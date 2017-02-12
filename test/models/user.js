const MemStore = require('../../store/memstore')
const UserModel = require('../../models/user')
const assert = require('assert')
const runner = require('../runner')

const store = new MemStore()
const model = new UserModel(store)

// runner([testEmail], function (err) {
//   if (!err) {
//     console.log('all done')
//   } else {
//     console.log('err', err.stack)
//   }
// })

describe('UserModel', function () {
  it('could get by email', testEmail)
})

function testEmail(done) {
  const testUser = {
    email: 'simlesos@gmail.com',
    nickname: 'hzq',
    password: '123456'
  }

  model.create(testUser, function (err) {
    assert(!err)
    model.getByEmail('simlesos@gmail.com', function (err, user) {
      assert(!err)
      assert.equal(user.email, testUser.email)
      assert.equal(user.nickname, testUser.nickname)
      assert.equal(user.password, testUser.password)
      done()
    })
  })
}