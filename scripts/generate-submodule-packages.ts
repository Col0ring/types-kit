import fse from 'fs'
import path from 'path'
import { rimrafSync } from 'rimraf'

function resolve(relativePath: string) {
  return path.resolve(__dirname, relativePath)
}

const packages = [
  'array',
  'basic',
  'control-flow',
  'convert',
  'mapper',
  'union',
  'utils',
]

function generatePackages() {
  rimrafSync(packages.map((p) => resolve(`../${p}`)))

  packages.forEach((p) => {
    const dir = resolve(`../${p}`)
    fse.mkdirSync(dir)
    fse.writeFileSync(
      path.join(dir, './package.json'),
      JSON.stringify(
        {
          typings:
            p === 'utils' ? '../src/utils.d.ts' : `../src/${p}/index.d.ts`,
        },
        null,
        2
      )
    )
  })
}

generatePackages()
