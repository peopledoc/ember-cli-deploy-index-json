/* eslint-env node*/
'use strict'

const subject = require('../../index')
const assert  = require('../helpers/assert')

describe('Manifest Json | configure hook', function() {
  let mockUi

  beforeEach(function() {
    mockUi = {
      verbose: true,
      messages: [],
      write() { },
      writeLine(message) {
        this.messages.push(message)
      }
    }
  })

  describe('default config', function() {
    it('provides some default values', function() {
      let instance = subject.createDeployPlugin({
        name: 'manifest-json'
      })

      let context = {
        ui: mockUi,
        config: {
          'manifest-json': {}
        }
      }

      instance.beforeHook(context)
      instance.configure(context)

      assert.ok(instance.readConfig('filePattern'))
      assert.equal(instance.readConfig('fileIgnorePattern'), null)
      assert.ok(instance.readConfig('indexPath'))
    })

    it('has overridable default values', function() {
      let instance = subject.createDeployPlugin({
        name: 'manifest-json'
      })

      let context = {
        ui: mockUi,
        config: {
          'manifest-json': {
            filePattern: '**/*',
            fileIgnorePattern: 'nope',
            indexPath: 'index.json'
          }
        }
      }

      instance.beforeHook(context)
      instance.configure(context)

      assert.ok(instance.readConfig('filePattern'), '**/*')
      assert.ok(instance.readConfig('fileIgnorePattern'), 'nope')
      assert.ok(instance.readConfig('indexPath'), 'index.json')
    })
  })
})
