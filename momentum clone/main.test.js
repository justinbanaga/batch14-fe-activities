const rewire = require("rewire")
const main = rewire("./main")
const setBg = main.__get__("setBg")
// @ponicode
describe("setBg", () => {
    test("0", () => {
        let result = setBg()
        expect(result).toMatchSnapshot()
    })
})
