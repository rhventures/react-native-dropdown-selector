describe("Integration Test", () => {

    context("Test Select with scrolling", ()=> {

        beforeEach("When the first drop down selector is open", async () => {
            const selector = await driver.$('-android uiautomator:new UiSelector().text(\"ᨆ\").instance(0)');
            selector.click();

            await driver.pause(3000);
        })

        it("should display item 3 is selected", async () => {
            const Item3 = await driver.$('accessibility id:Item 3')
            Item3.click();
            const selector = await driver.$('accessibility id:Item 3, ᨆ');
            await expect(selector).toExist();
            
            const selectorDisplay = await selector.$$('.android.widget.TextView')[0];
            console.log(selectorDisplay);
            await expect(selectorDisplay).toHaveText('Item 3')
        })

        it("should display item 4 is selected", async () => {
            const Item4 = await driver.$('accessibility id:Item 4')
            Item4.click();
            const selector = await driver.$('accessibility id:Item 4, ᨆ');
            await expect(selector).toExist();
            
            const selectorDisplay = await selector.$$('.android.widget.TextView')[0];
            console.log(selectorDisplay);
            await expect(selectorDisplay).toHaveText('Item 4')
        })        

        it("should display item 6 is selected", async () => {
            await driver.action('pointer', {parameters: {pointerType: 'touch'}})
                    .move({duration : 0, x: 642 , y: 1050})
                    .down({button: 0})
                    .move({duration : 100, x: 642 , y: 790})
                    .up({button: 0})
                    .perform();

            await driver.action('pointer')
            const Item6 = await driver.$('accessibility id:Item 6')
            Item6.click();
            const selector = await driver.$('accessibility id:Item 6, ᨆ');
            await expect(selector).toExist();
            
            const selectorDisplay = await selector.$$('.android.widget.TextView')[0];
            console.log(selectorDisplay);
            await expect(selectorDisplay).toHaveText('Item 6')
        })

        it("should display item abc is selected", async () => {
            await driver.action('pointer', {parameters: {pointerType: 'touch'}})
                    .move({duration : 0, x: 642 , y: 1095})
                    .down({button: 0})
                    .move({duration : 100, x: 642 , y: 660})
                    .up({button: 0})
                    .perform();

            const ItemABC = await driver.$('accessibility id:abc')
            ItemABC.click();
            const selector = await driver.$('accessibility id:abc, ᨆ');
            await expect(selector).toExist();
            
            const selectorDisplay = await selector.$$('.android.widget.TextView')[0];
            console.log(selectorDisplay);
            await expect(selectorDisplay).toHaveText('abc');
        })

    })
})