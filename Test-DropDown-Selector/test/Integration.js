describe("Integration Test", () => {

    const topSelector = '-android uiautomator:new UiSelector().text(\"ᨆ\").instance(0)';
    const scrollCoordinates =[{'x': 642 , 'y1': 1050, 'y2': 900, 'y3': 560}]

    scrollAndSelectTest(topSelector, scrollCoordinates[0]);

    function scrollAndSelectTest(dropdown, scrollCoordinates){

        context("Test Select with scrolling", ()=> {
            
            beforeEach("When the first drop down selector is open", async () => {
                const selector = await driver.$(dropdown);
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
            .move({duration : 0, x: scrollCoordinates['x'] , y: scrollCoordinates['y1']})
            .down({button: 0})
            .move({duration : 100, x: scrollCoordinates['x'] , y: scrollCoordinates['y2']})
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
            .move({duration : 0, x: scrollCoordinates['x'] , y: scrollCoordinates['y1']})
            .down({button: 0})
            .move({duration : 100, x: scrollCoordinates['x'] , y: scrollCoordinates['y3']})
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
    }
})