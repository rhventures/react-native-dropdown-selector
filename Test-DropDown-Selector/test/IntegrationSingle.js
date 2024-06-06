describe("Integration Test", () => {

    const topSelector = '-android uiautomator:new UiSelector().text(\"ᨆ\").instance(0)';
    const bottomSelector = '-android uiautomator:new UiSelector().text("ᨆ").instance(1)';
    const scrollCoordinatesSet =[{'x': 642 , 'y1': 1050, 'y2': 900, 'y3': 560}, 
    {'x': 642, 'y1': 2104, 'y2': 1880, 'y3': 1680}]
    const itemsToTest = [['Item 3', 'Item 4', 'Item 6', 'abc'],['Item 7', 'Item 1', 'Item 5', 'Item 6']]

    scrollAndSelectTest(topSelector, scrollCoordinatesSet[0], itemsToTest[0]);
    scrollAndSelectTest(bottomSelector, scrollCoordinatesSet[1], itemsToTest[1]);

    function scrollAndSelectTest(dropdown, scrollCoordinates, itemToTest){

        context("Test Select with scrolling", ()=> {
            
        beforeEach("When the drop down selector is open", async () => {
            await driver.pause(1000);
            const selector = await driver.$(dropdown);
            selector.click();                
            await driver.pause(3000);
        })
        
        it(`should display ${itemToTest[0]} is selected`, async () => {
            const Item3 = await driver.$(`accessibility id:${itemToTest[0]}`)
            Item3.click();
            await driver.pause(500);
    
            const selector = await driver.$(`accessibility id:${itemToTest[0]}, ᨆ`);
            await expect(selector).toExist();
            
            const selectorDisplay = await selector.$$('.android.widget.TextView')[0];
            //console.log(selectorDisplay);
            await selectorDisplay.waitForExist(500);
            await expect(selectorDisplay).toHaveText(itemToTest[0])
        })
        
        it(`should display ${itemToTest[1]} is selected`, async () => {
            const Item4 = await driver.$(`accessibility id:${itemToTest[1]}`)
            Item4.click();

            await driver.pause(500);

            const selector = await driver.$(`accessibility id:${itemToTest[1]}, ᨆ`);
            await expect(selector).toExist();
            
            const selectorDisplay = await selector.$$('.android.widget.TextView')[0];
            //console.log(selectorDisplay);
            await selectorDisplay.waitForExist(500);
            await expect(selectorDisplay).toHaveText(itemToTest[1])
        })        
        
        it(`should display ${itemToTest[2]} is selected`, async () => {
            await driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 100, x: scrollCoordinates['x'] , y: scrollCoordinates['y1']})
            .down({button: 0})
            .move({duration : 500, x: scrollCoordinates['x'] , y: scrollCoordinates['y2']})
            .up({button: 0})
            .perform();
            await driver.pause(500);
        
            const Item6 = await driver.$(`accessibility id:${itemToTest[2]}`)
            Item6.click();
            await driver.pause(500);

            const selector = await driver.$(`accessibility id:${itemToTest[2]}, ᨆ`);
            await expect(selector).toExist();
            
            const selectorDisplay = await selector.$$('.android.widget.TextView')[0];
            //console.log(selectorDisplay);
            await selectorDisplay.waitForExist(500);
            await expect(selectorDisplay).toHaveText(itemToTest[2])
        })
        
        it(`should display ${itemToTest[3]} is selected`, async () => {
            await driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 100, x: scrollCoordinates['x'] , y: scrollCoordinates['y1']})
            .down({button: 0})
            .move({duration : 500, x: scrollCoordinates['x'] , y: scrollCoordinates['y3']})
            .up({button: 0})
            .perform();
            await driver.pause(500);

            const ItemABC = await driver.$(`accessibility id:${itemToTest[3]}`)
            ItemABC.click();
            await driver.pause(500);
            
            const selector = await driver.$(`accessibility id:${itemToTest[3]}, ᨆ`);
            await expect(selector).toExist();
            
            const selectorDisplay = await selector.$$('.android.widget.TextView')[0];
            //console.log(selectorDisplay);
            await selectorDisplay.waitForExist(500);
            await expect(selectorDisplay).toHaveText(itemToTest[3])
            })
        })
    }
})