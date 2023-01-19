export type ConfigKey = string
export type Config = unknown
export type ConfigStr = string

export abstract class Processor {
  abstract set(key: ConfigKey, value: unknown): void
  abstract overwrite(): ConfigStr
}
