describe("Click Me Demo", () => {
    context("multi-select demo with arrow button", () => {
        beforeEach(async () => {
           
            const selector = await driver.$("-android uiautomator:new UiSelector().text(\"ᨆ\").instance(2)");
            await selector.click();
        })
        
        it("Should show item 3 and item 4 selected", async () => {
            const Item4 = await driver.$("accessibility id:Item 4");
            await Item4.click();
            const Item3 = await driver.$("accessibility id:Item 3");
            await Item3.click();
            const backScreen = await driver.$("-android uiautomator:new UiSelector().className(\"android.view.ViewGroup\").instance(3)");
            await backScreen.click();

            const selected = await driver.$("accessibility id:Item 4, Item 3, ᨆ");
            await expect(selected).toHaveAttribute('content-desc', "Item 4, Item 3, ᨆ");
        })

        it("Should show item 3, item 4, and item 7 selected", async () => {
            const Item7 = await driver.$("accessibility id:Item 7");
            await Item7.click();
            const backScreen = await driver.$("-android uiautomator:new UiSelector().className(\"android.view.ViewGroup\").instance(3)");
            await backScreen.click();

            const selected = await driver.$("accessibility id:Item 4, Item 3, Item 7, ᨆ");
            await expect(selected).toHaveAttribute('content-desc', "Item 4, Item 3, Item 7, ᨆ");
        })

        it("Should show item 3 and item 7 selected", async () => {
            const Item4 = await driver.$("accessibility id:Item 4");
            await Item4.click();
            const backScreen = await driver.$("-android uiautomator:new UiSelector().className(\"android.view.ViewGroup\").instance(3)");
            await backScreen.click();

            const selected = await driver.$("accessibility id:Item 3, Item 7, ᨆ");
            await expect(selected).toHaveAttribute('content-desc', "Item 3, Item 7, ᨆ");
        })
        
        it("Should show all Items selected", async () => {
            const Item1 = await driver.$("accessibility id:Item 1");
            await Item1.click();
            const Item2 = await driver.$("accessibility id:Item 2");
            await Item2.click();
            const Item3 = await driver.$("accessibility id:Item 4");
            await Item3.click();
            const backScreen = await driver.$("-android uiautomator:new UiSelector().className(\"android.view.ViewGroup\").instance(3)");
            await backScreen.click();

            const selected = await driver.$("accessibility id:Item 3, Item 7, Item 1, Item 2, Item 4, ᨆ");
            await expect(selected).toHaveAttribute('content-desc', "Item 3, Item 7, Item 1, Item 2, Item 4, ᨆ");
        })

        it("Should have all items deselected", async () => {
            const Item2 = await driver.$("accessibility id:Item 2");
            await Item2.click();
            const Item3 = await driver.$("accessibility id:Item 3");
            await Item3.click();
            const Item1 = await driver.$("accessibility id:Item 1");
            await Item1.click();
            const Item7 = await driver.$("accessibility id:Item 7");
            await Item7.click();
            const Item4 = await driver.$("accessibility id:Item 4");
            await Item4.click();
            const backScreen = await driver.$("-android uiautomator:new UiSelector().className(\"android.view.ViewGroup\").instance(3)");
            await backScreen.click();

            const selected = await driver.$("-android uiautomator:new UiSelector().description(\"Click me, ᨆ\").instance(1)");
            await expect(selected).toHaveAttribute('content-desc', "Click me, ᨆ");
        })
    })




   
})