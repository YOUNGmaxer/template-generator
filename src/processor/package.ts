import fs from 'node:fs'

export enum PackageKey {
  name = 'name'
}

type PackageValue = unknown

type Package = Record<PackageKey, PackageValue>

/**
 * package.json 加工器
 */
export class PackageProcessor {
  private readonly packagePath: string
  private package: Package

  constructor(packagePath: string) {
    try {
      this.packagePath = packagePath
      this.package = JSON.parse(fs.readFileSync(packagePath, { encoding: 'utf-8' }))
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * 获取属性值
   * @param key - 属性
   * @returns 属性值
   */
  public get(key: PackageKey): PackageValue {
    return this.package[key]
  }

  /**
   * 设置属性值
   * @param key - 属性
   * @param value - 属性值
   */
  public set(key: PackageKey, value: PackageValue): void {
    this.package[key] = value
  }

  /**
   * 覆盖 package.json 原文件
   */
  public overwrite(): string {
    const result = JSON.stringify(this.package, null, '  ')
    fs.writeFileSync(this.packagePath, result)
    return result
  }
}
