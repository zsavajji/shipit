export default {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '6',
        },
        loose: true,
      },
    ],
  ],
}
