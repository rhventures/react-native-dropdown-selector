describe("Interference Test", () => {
    context("When first drop down selector is down", ()=> {
        before("When the first drop down selector is open", async () => {
            const selector = await driver.$('-android uiautomator:new UiSelector().text(\"ᨆ\").instance(0)');
            selector.click();
        })

        it("should not be able to click the second drop box", async () => {
            const SmallSelector = await driver.$('-android uiautomator:new UiSelector().text(\"ᨆ\").instance(1)');
        })
    })
})