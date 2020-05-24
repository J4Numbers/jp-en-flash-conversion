module.exports = {
    lines: 80,
    statements: 80,
    functions: 80,
    branches: 80,
    'check-coverage': true,
    exclude: [
        "nyc.config.js",
        ".eslintrc.js",
        "gulpfile.js",
        "coverage/**",
        "node_modules/**",
        "test/**",
        "public/**",
        "config/**"
    ],
    reporter: [
        "lcov",
        "cobertura",
        "text",
        "text-summary"
    ]
}
