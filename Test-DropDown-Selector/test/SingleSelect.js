describe("Click Me Demo", () => {

    context("single select", () => {

        beforeEach("When drop down selector is down",async () => { //setting the condition
            //click the dropdown menu bar
            const selector = await driver.$("-android uiautomator:new UiSelector().text(\"ᨆ\").instance(0)");
            await selector.click();
            //await driver.pause(3000);
        })
        
        it("should show item 3 selected", async () => {
            //click item 3
            const Item3 = await driver.$("accessibility id:Item 3");
            await Item3.click();
            
            const selectedItem = await driver.$("-android uiautomator:new UiSelector().text(\"Selected: Item 3 (scroll down)\")");
            await expect(selectedItem).toHaveText('Selected: Item 3 (scroll down)');
            
        });
        
        it("should show item 4 selected", async () => {
            const Item3 = await driver.$("accessibility id:Item 4");
            await Item3.click();
            
            const selectedItem = await driver.$("-android uiautomator:new UiSelector().text(\"Selected: Item 4 (scroll down)\")");
            await expect(selectedItem).toHaveText('Selected: Item 4 (scroll down)');
        })
        
        it("should show item 7 selected", async () => {
            const Item3 = await driver.$("accessibility id:Item 7");
            await Item3.click();
            
            const selectedItem = await driver.$("-android uiautomator:new UiSelector().text(\"Selected: Item 7 (scroll down)\")");
            await expect(selectedItem).toHaveText('Selected: Item 7 (scroll down)');
            
        })
        
        it("should show item 1 selected", async () => {
            const Item3 = await driver.$("accessibility id:Item 1");
            await Item3.click();
            
            const selectedItem = await driver.$("-android uiautomator:new UiSelector().text(\"Selected: Item 1 (scroll down)\")");
            await expect(selectedItem).toHaveText('Selected: Item 1 (scroll down)');
            
        })
        
        it("should show item 2 selected", async () => {
            const Item3 = await driver.$("accessibility id:Item 2");
            await Item3.click();
            
            const selectedItem = await driver.$("-android uiautomator:new UiSelector().text(\"Selected: Item 2 (scroll down)\")");
            await expect(selectedItem).toHaveText('Selected: Item 2 (scroll down)');
        })
    })
})

