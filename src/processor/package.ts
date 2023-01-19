import fs from 'node:fs'
import { Processor, ConfigStr } from '@/type/processor'

export enum PackageKey {
  name = 'name',
  dependencies = 'dependencies'
}

export type PackageObject = Record<string, unknown>

type PackageValue = string | number | PackageObject | PackageValue[]

/** 依赖包名 */
type PackageName = string

/** 依赖包版本 */
type PackageVersion = string

type Package = Record<PackageKey, PackageValue>

/**
 * package.json 加工器
 */
export class PackageProcessor extends Processor {
  private readonly packagePath: string
  private package: Package

  constructor(packagePath: string) {
    super()
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
  public get<T extends PackageValue>(key: PackageKey): T {
    return this.package[key] as T
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
   * 添加依赖包
   * @param packageName - 依赖包名
   */
  public addDep(packageName: PackageName, version: PackageVersion): void {
    const dependencies = this.get(PackageKey.dependencies) ?? {}
    dependencies[packageName] = version
    this.set(PackageKey.dependencies, dependencies)
  }

  /**
   * 覆盖 package.json 原文件
   */
  public overwrite(): ConfigStr {
    const result = JSON.stringify(this.package, null, '  ')
    fs.writeFileSync(this.packagePath, result)
    return result
  }
}
