module.exports = (name) => {
  return function () {
    console.log.apply(null, [name].concat([].slice.call(arguments)))
  }
}
