import path from 'node:path'
import fs from 'node:fs'
import { TemplatePart } from './type'

const templateRootPath = path.resolve(__dirname, '../../template')

function buildSourcePath(part: TemplatePart): string {
  return path.resolve(templateRootPath, part)
}

/**
 * 生成项目模板
 * 将指定目录下的文件拷贝到目标目录下:
 *   - 针对目录类型进行递归拷贝
 *   - 针对 _filename 文件重命名为 .filename
 *
 * @param part - 生成的模板组成部分
 * @param dest - 生成模板的目标路径
 */
function generateTemplate(part: TemplatePart, dest: string): void {
  const src = buildSourcePath(part)
  const stat = fs.statSync(src)

  console.log(stat)
}

export { generateTemplate }
