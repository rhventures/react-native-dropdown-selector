describe("Integration test for the multi selector", () => {

    const itemCombo = [['Item 3', 'Item 7'], ['Item 4', 'Item 2'], ['Item 1', 'Item 2', 'Item 3']
    ,['Item 5', 'Item 8'], ['Item 6', 'Item 5', 'Item 8']]
    const multiSelectArrow = '-android uiautomator:new UiSelector().text(\"ᨆ\").instance(2)';
    const scrollCoordinatesSet = [{'x' :645, 'y1': 2320, 'y2': 1715}];
    multipleItemSelectTest(itemCombo, multiSelectArrow, scrollCoordinatesSet);

    function multipleItemSelectTest(itemCombo, dropDownArrow, scrollCoordinates){
        context("When choosing multiple items at once", () => {
            
            function scroll(scrollCoordinates){
                return driver.action('pointer', {parameters: {pointerType: 'touch'}})
                .move({duration : 100, x: scrollCoordinates['x'] , y: scrollCoordinates['y1']})
                .down({button: 0})
                .move({duration : 500, x: scrollCoordinates['x'] , y: scrollCoordinates['y2']})
                .up({button: 0});
            }
            function getBackScreen() {
                return '-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(3)';
            }
            function getSelector(){
                return '-android uiautomator:new UiSelector().description("Click me, ᨆ").instance(1)';
            }

            beforeEach(async () => {
                await driver.pause(2000);
                const multiSelector = await driver.$(dropDownArrow);
                multiSelector.click();
                await driver.pause(3000);
            })

            multipleItemTest(itemCombo[0]);
            multipleItemTest(itemCombo[1]);
            multipleItemTest(itemCombo[2]);
            multipleItemTest(itemCombo[3], scrollCoordinates[0]);
            multipleItemTest(itemCombo[4], scrollCoordinates[0]);
        
            function multipleItemTest(items, scrollCoordinates = null){
                it(`should have ${items.join(', ')} selected`, async () => {
                    if(scrollCoordinates != null){
                        await scroll(scrollCoordinates).perform();
                        await driver.pause(500);
                    }

                    for(let i = 0; i < items.length; i ++){
                        const item = await driver.$(`accessibility id:${items[i]}`);
                        item.click();
                        await driver.pause(1000);
                    }

                    const backScreen = await driver.$(getBackScreen());
                    backScreen.click();
                    await driver.pause(500);

                    const selector = await driver.$(`accessibility id:${items.join(', ')}, ᨆ`);
                    const selectorDisplay = await selector.$$('.android.widget.TextView');

                    for(let i = 0; i < items.length; i++){
                        await expect(selectorDisplay[i]).toHaveText(items[i]);                    
                    }
                    const multiSelector = await driver.$(dropDownArrow);
                    multiSelector.click();
                    await driver.pause(1000);

                    if(scrollCoordinates != null){
                        await scroll(scrollCoordinates).perform();
                        await driver.pause(500);
                    }

                    for(let i = 0; i < items.length; i ++){
                        const item = await driver.$(`accessibility id:${items[i]}`);
                        item.click();
                        await driver.pause(500);
                    } 
                    const Screen = await driver.$(getBackScreen());
                    Screen.click();
                    await driver.pause(500);

                    const originalSelector = await driver.$(getSelector());
                    const originalSelectorDisplay = await originalSelector.$$('.android.widget.TextView')[0];

                    await expect(originalSelectorDisplay).toHaveText('Click me');
                })
            }
        })
    }
})