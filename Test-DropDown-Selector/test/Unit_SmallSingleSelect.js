describe("Small Selector", () => {
    context("single select small button", () => {
        beforeEach(async () => {
            const smallSelector = await driver.$("-android uiautomator:new UiSelector().text(\"ᨆ\").instance(1)");
            await smallSelector.click();
        })
    
        it("should show item 2 selected", async () => {
            const Item3 = await driver.$("accessibility id:Item 2");
            await Item3.click();
            
            const selector = await driver.$("accessibility id:Item 2, ᨆ");
            await expect(selector).toExist();

        })

        it("should show item 1 selected", async () => {
            const Item1 = await driver.$("accessibility id:Item 1");
            await Item1.click();
            
            const selector = await driver.$("accessibility id:Item 1, ᨆ");
            await expect(selector).toExist();
        })

        it("should show item 7 selected", async () => {
            const Item7 = await driver.$("accessibility id:Item 7");
            await Item7.click();
            
            const selector = await driver.$("accessibility id:Item 7, ᨆ");
            await expect(selector).toExist();
        })

        it("should show item 4 selected", async () => {
            const Item4 = await driver.$("accessibility id:Item 4");
            await Item4.click();
            
            const selector = await driver.$("accessibility id:Item 4, ᨆ");
            await expect(selector).toExist();
        })

        it("should show item 3 selected", async () => {
            const Item3 = await driver.$("accessibility id:Item 3");
            await Item3.click();
            
            const selector = await driver.$("accessibility id:Item 3, ᨆ");
            await expect(selector).toExist();
        })
    })
})