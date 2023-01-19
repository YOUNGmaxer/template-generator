import path from 'node:path'
import fs from 'node:fs'
import { describe, expect, it } from '@jest/globals'
import { PackageProcessor, PackageKey, PackageObject } from '@/processor/package'

const packagePath = path.resolve(__dirname, 'package.json')

describe('PackageProcessor', () => {
  describe('set method', () => {
    const packageProcessor = new PackageProcessor(packagePath)
    it('should set name', () => {
      packageProcessor.set(PackageKey.name, 'test-name')
      expect(packageProcessor.get(PackageKey.name)).toBe('test-name')
    })
  })

  describe('dep method', () => {
    const packageProcessor = new PackageProcessor(packagePath)
    it('should add dep', () => {
      packageProcessor.addDep('eslint', '^8.32.0')
      expect(packageProcessor.get<PackageObject>(PackageKey.dependencies).eslint).toBe('^8.32.0')
    })
  })

  describe('overwrite method', () => {
    const packageProcessor = new PackageProcessor(packagePath)
    it('should overwrite package.json', () => {
      packageProcessor.set(PackageKey.name, 'test-name')
      const result = packageProcessor.overwrite()
      expect(fs.readFileSync(packagePath, { encoding: 'utf-8' })).toBe(result)
    })
  })
})
