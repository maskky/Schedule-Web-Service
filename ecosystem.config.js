module.exports = {
  apps : [{
    name      : "Wpm",
    script    : "index.js",
    instances : "max",
    exec_mode : "cluster"
  }]
}