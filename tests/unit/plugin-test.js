/* eslint-env node*/
'use strict'

const subject = require('../../index')
const assert  = require('../helpers/assert')

describe('Manifest Json plugin', function() {
  it('has a name', function() {
    let instance = subject.createDeployPlugin({
      name: 'manifest-json'
    })

    assert.equal(instance.name, 'manifest-json')
  })

  it('implements the correct hooks', function() {
    let plugin = subject.createDeployPlugin({
      name: 'manifest-json'
    })

    assert.isDefined(plugin.configure)
    assert.isFunction(plugin.configure)
  })
})
