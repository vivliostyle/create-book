module.exports = {
  title: '{{name}}', // populated into `manifest.json`, default to `title` of the first entry or `name` in `package.json`.
  author: '{{contact}}', // default to `author` in `package.json` or undefined.
  // language: 'ja', // default to `en`.
  // size: 'A4', // paper size.
  theme: '{{theme.name}}', // .css or local dir or npm package. default to undefined.
  entry: [
    'manuscript.md', // `title` is automatically guessed from the file (frontmatter > first heading).
    // {
    //   path: 'epigraph.md',
    //   title: 'Epigraph', // title can be overwritten (entry > file),
    //   theme: '@vivliostyle/theme-whatever', // theme can be set indivisually. default to the root `theme`.
    // },
    // 'glossary.html', // html can be passed.
  ], // `entry` can be `string` or `object` if there's only single markdown file.
  // entryContext: './manuscripts', // default to '.' (relative to `vivliostyle.config.js`).
  // output: [ // path to generate draft file(s). default to '{title}.pdf'
  //   './output.pdf', // the output format will b inferred from the name.
  //   {
  //     path: './book',
  //     format: 'webbook',
  //   },
  // ],
  // workspaceDir: '.vivliostyle', // directory which is saved intermediate files.
  // toc: true, // whether generate and include toc.html or not (does not affect manifest.json), default to `true`. if `string` given, use it as a custom toc.html.
  // cover: './cover.png', // cover image. default to undefined.
}
