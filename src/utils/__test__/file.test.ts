import { describe, it } from '@jest/globals'
import { copyDir } from '../file'

describe('file', () => {
  it('copyDir', () => {
    copyDir(
      '/Users/azeryang/Mine/Projects/template-generator/template/base',
      '/Users/azeryang/Mine/Projects/template-generator/out/template/base'
    )
  })
})
